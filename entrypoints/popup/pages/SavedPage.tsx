import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeQuestion, RootState } from '../../../store';

export default function SavedPage() {
  const saved = useSelector((s: RootState) => s.saved);
  const dispatch = useDispatch();

  return (
    <div className="min-w-[320px] p-4 bg-white text-gray-900">
      <div className="flex items-center gap-4 mb-4">
        <h1 className="text-xl font-semibold">Saved Questions</h1>
        <Link to="/" className="ml-auto rounded bg-blue-600 text-white text-xs px-2 py-1 hover:bg-blue-700">
          Back to Home
        </Link>
      </div>

      <ul className="space-y-2 rounded-lg border border-gray-200 p-3">
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
  );
}
