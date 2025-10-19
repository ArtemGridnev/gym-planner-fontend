import './App.css'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/Login/LoginPage'
import RegisterPage from './pages/Register/RegisterPage'
import Dashboard from './pages/Dashboard/Dashboard'
import Exercises from './pages/Dashboard/Managment/Exercises'
import AuthProvider from './context/AuthProvider'
import ProtectedRoute from './components/routes/ProtectedRoute'
import PublicRoute from './components/routes/PublicRoute'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Exercises />} />
            <Route path="/dashboard/exercises" element={<Exercises />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
