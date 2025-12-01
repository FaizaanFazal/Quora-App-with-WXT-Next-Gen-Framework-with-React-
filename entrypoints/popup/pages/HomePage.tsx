import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import wxtLogo from '/wxt.svg';
import reactLogo from '@/assets/react.svg';
import { addQuestion, removeQuestion, RootState } from '../../../store';

export default function HomePage() {
  const [questions, setQuestions] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error' | 'not-quora'>('idle');
  const saved = useSelector((s: RootState) => s.saved);
  const dispatch = useDispatch();

  useEffect(() => {
    const run = async () => {
      try {
        setStatus('loading');
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const url = tab?.url ?? '';
        if (!url.includes('quora.com') || !tab?.id) {
          setStatus('not-quora');
          return;
        }
        const [{ result }] = await chrome.scripting.executeScript({
          target: { tabId: tab.id },
            func: () => {
              const candidates = new Set<string>();
              const takeText = (el: Element | null) => el?.textContent?.trim() ?? '';
              document.querySelectorAll('h1,h2,h3').forEach(h => {
                const t = takeText(h);
                if (t && /[?]$/.test(t)) candidates.add(t);
              });
              document.querySelectorAll(
                'a[href*="/q/"], a[href^="/What-"], a[href*="/What-"], a[href*="/Why-"], a[href*="/How-"], a[href*="/Who-"]'
              ).forEach(a => {
                const t = takeText(a);
                if (t && t.split(' ').length > 3) candidates.add(t);
              });
              document.querySelectorAll('article, p, span, div').forEach(el => {
                const t = takeText(el);
                if (t && t.length > 20 && /[?]$/.test(t)) candidates.add(t);
              });
              return Array.from(candidates).slice(0, 30);
            },
        });
        setQuestions(result ?? []);
        setStatus('done');
      } catch {
        setStatus('error');
      }
    };
    run();
  }, []);

  return (
    <div className="min-w-[320px] p-4 bg-white text-gray-900">
      <div className="flex items-center gap-4 mb-4">
        <a href="https://wxt.dev" target="_blank" className="opacity-80 hover:opacity-100 transition">
          <img src={wxtLogo} className="h-10 w-10" alt="WXT logo" />
        </a>
        <a href="https://react.dev" target="_blank" className="opacity-80 hover:opacity-100 transition">
          <img src={reactLogo} className="h-10 w-10" alt="React logo" />
        </a>
        <h1 className="text-xl font-semibold">Quora Questions</h1>
        <Link to="/saved" className="ml-auto rounded bg-gray-800 text-white text-xs px-2 py-1 hover:bg-black">
          Go to Saved
        </Link>
      </div>

      <div className="rounded-lg border border-gray-200 p-3 mb-3">
        {status === 'loading' && <p className="text-sm text-gray-600">Loading questions…</p>}
        {status === 'not-quora' && <p className="text-sm text-red-600">Open a Quora page to see questions.</p>}
        {status === 'error' && <p className="text-sm text-red-600">Failed to read the page. Try reloading.</p>}
        {status === 'done' && (
          <ul className="space-y-2">
            {questions.length === 0 && <li className="text-sm text-gray-600">No questions found.</li>}
            {questions.map((q, i) => (
              <li key={i} className="flex items-start justify-between gap-2">
                <span className="text-sm truncate max-w-[220px] flex-1">{q}</span>
                <button
                  className="shrink-0 rounded bg-blue-600 text-white text-xs px-2 py-1 hover:bg-blue-700"
                  onClick={() => dispatch(addQuestion(q))}
                >
                  Save
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="rounded-lg border border-gray-200 p-3">
        <h2 className="text-sm font-semibold mb-2">Saved Questions</h2>
        <ul className="space-y-2">
          {saved.length === 0 && <li className="text-xs text-gray-600">No saved questions.</li>}
          {saved.map((q, i) => (
            <li key={i} className="flex items-start justify-between gap-2">
              <span className="text-sm">{q}</span>
              <button
                className="shrink-0 rounded bg-gray-200 text-gray-800 text-xs px-2 py-1 hover:bg-gray-300"
                onClick={() => dispatch(removeQuestion(q))}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-3 text-xs text-gray-500">Works only on quora.com</p>
    </div>
  );
}
