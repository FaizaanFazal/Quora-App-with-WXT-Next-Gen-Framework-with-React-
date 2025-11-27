# Quora Question Saver (WXT + React + Redux + Tailwind)

A browser extension built with [WXT](https://wxt.dev), React 19, Redux Toolkit, and Tailwind CSS. It runs a popup that (on any open Quora page) scrapes visible question-like text, lists it, and lets you save/remove questions locally (in-memory Redux store).

## Current Features
- Popup UI (React + Tailwind(not configured yet)).
- Scrapes questions directly from the active Quora tab using `chrome.scripting.executeScript`.
- Heuristics: headings, anchor patterns (What/Why/How/Who), any longer text ending with `?`.
- Save a question (stored in Redux slice).
- Remove saved questions.
- Live update between fetched list and saved list.
- Manifest restricted to: `https://www.quora.com/*`.
- Permissions: `tabs`, `activeTab`, `scripting`.

## Tech Stack
- WXT (extension build + HMR).
- React 19 + JSX.
- Redux Toolkit + react-redux.
- Tailwind CSS utilities.
- TypeScript.

## Getting Started
1. Install deps:
   - npm install
2. Run in Chrome (default):
   - npm run dev
3. Load extension (if not auto-loaded):
   - Open chrome://extensions
   - Enable Developer Mode
   - Load unpacked: select `.output/chrome-mv3`
4. Open a Quora page (e.g. https://www.quora.com/) then open the extension popup.

## How It Works
- Popup queries active tab URL; if not Quora shows a message.
- Injects a script via `chrome.scripting` to read DOM (avoids CSP blocked fetch).
- Collects up to 30 candidate questions.
- Renders:
  - Fetched questions with “Save” buttons.
  - Saved questions with “Remove” buttons.

## Expected Behavior
- Only operates when a Quora page is active.
- Saving is ephemeral (resets on popup reload). No persistence yet.
- Some non-question items may appear due to heuristic broad match.

## Scripts
- dev: HMR extension development
- build: production build
- zip: build + zip packaging
- dev:firefox / build:firefox / zip:firefox (use Firefox target)

## Permissions Rationale
- tabs: identify current active tab.
- activeTab: temporary access to the page.
- scripting: inject scraping function.
- host_permissions: restrict scope to Quora domain.

## Folder Notes
- entrypoints/popup/App.tsx: main UI logic.
- store.ts (Redux store + slice).
- wxt.config.ts: manifest config.

## Tailwind Usage
Utilities applied directly in JSX. (Ensure Tailwind config/postcss set up if expanding beyond basic usage.)

## Roadmap / Next Ideas
- Persist saved questions (storage.local).
- Export saved list (copy/share).
- Better question deduplication.
- Improved parsing (avoid unrelated text).
- Dark mode toggle.

## Troubleshooting
- No questions: scroll page to load more dynamic content then reopen popup.
- Permissions error: reload extension after changing `wxt.config.ts`.
- Changes not reflected: restart `npm run dev`.

## License
Internal / unspecified (add one if needed).
