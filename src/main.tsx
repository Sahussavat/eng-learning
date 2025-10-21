import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainPage from './components/main_page/MainPage.tsx'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import ResultPage from './components/result_page/ResultPage.tsx'
import ChoicesPage from './components/choice_page/ChoicesPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
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
                        path="/choices"
                        element={<ChoicesPage />}
                    />
                    <Route
                        path="*"
                        element={<Navigate to="/" />}
                    />
                </Routes>
            </Router>
  </StrictMode>,
)
