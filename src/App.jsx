import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AddJob from './pages/AddJob'
import ProtectedRoute from './components/ProtectedRoute'
import EditJob from './pages/EditJob'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/edit-job/:id' element={<EditJob />} />
      <Route path="/add-job" element={
        <ProtectedRoute>
          <AddJob />
        </ProtectedRoute>
      } />
    </Routes>
    </BrowserRouter >

  )
}

export default App