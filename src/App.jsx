import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from './components/Login'
import Regrister from './components/Regrister'
import Dashboard from './components/Dashboard';
import {ToastContainer} from "react-toastify"
import './App.css'

function App() {


  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/Login' element={<Login />} />
              <Route path='/register' element={<Regrister />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
            <ToastContainer />
          </div>
        </div>
      </div>

    </Router>
  )
}

export default App
