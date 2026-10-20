import { createRoot } from 'react-dom/client'
import './index.css'
import MainPage from './features/main_page/MainPageView.tsx'
import { Navigate, Route, HashRouter as Router, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import GuessPage from './features/guess_page/GuessPageView.tsx'

createRoot(document.getElementById('root')!).render(
  <>
            <Router>
                <Routes>
                    <Route
                        path="/home"
                        element={<MainPage />}
                    />
                    <Route
                        path="/guess"
                        element={<GuessPage />}
                    />
                    <Route
                        path="*"
                        element={<Navigate to="/home" />}
                    />
                </Routes>
            </Router>
  </>,
)
