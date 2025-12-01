import { Provider } from 'react-redux';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { store } from '../../store';
import HomePage from './pages/HomePage';
import './tailwind.css';
import SavedPage from './pages/SavedPage';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/saved" element={<SavedPage />} />
        </Routes>
      </HashRouter>
    </Provider>
  );
}

export default App;
