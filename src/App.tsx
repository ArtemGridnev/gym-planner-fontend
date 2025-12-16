import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import Dashboard from './pages/dashboard/Dashboard'
import Exercises from './pages/dashboard/managment/Exercises'
import AuthProvider from './context/AuthProvider'
import ProtectedRoute from './components/routes/ProtectedRoute'
import PublicRoute from './components/routes/PublicRoute'
import Trains from './pages/dashboard/managment/Trains'
import TrainSessions from './pages/dashboard/TrainSessions'
import Train from './pages/dashboard/managment/Train'

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/train-sessions" replace />} />

        {/* Auth */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Dashboard */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Dashboard />}>
            <Route path="/managment">
              <Route path="/managment/exercises" element={<Exercises />} />
              <Route path="/managment/trains">
                <Route index element={<Trains />} />
                <Route path="/managment/trains/:id" element={<Train />} />
              </Route>
            </Route>
            <Route path="/train-sessions" element={<TrainSessions />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
