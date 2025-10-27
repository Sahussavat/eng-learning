import { createRoot } from 'react-dom/client'
import './index.css'
import MainPage from './components/main_page/MainPage.tsx'
import { Navigate, Route, HashRouter as Router, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import ResultPage from './components/result_page/ResultPage.tsx'
import GuessPage from './components/choice_page/GuessPage.tsx'

createRoot(document.getElementById('root')!).render(
  <>
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={<MainPage />}
                    />
                    <Route
                        path="/result"
                        element={<ResultPage />}
                    />
                    <Route
                        path="/guess"
                        element={<GuessPage />}
                    />
                    <Route
                        path="*"
                        element={<Navigate to="/" />}
                    />
                </Routes>
            </Router>
  </>,
)
