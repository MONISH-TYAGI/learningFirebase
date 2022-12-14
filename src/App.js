import React from 'react'
import Login from './Components/login';
import SignUp from './Components/SignUp';
import Home from './Components/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {AuthProvider} from './Context/AuthContext'
import PrivateRoute from './Components/PrivateRoute';
import { CartContextProvider } from './Context/CartContext';
function App() {
  return (
    <div>
      <h1>Hello App</h1>
      <BrowserRouter>
      <AuthProvider>
        <CartContextProvider>
    <Routes>

        <Route  path="/login" element={<Login/>} />
        <Route  path="/signup" element={<SignUp />} />
        <Route
  path="*"
  element={
    <PrivateRoute>
      <Home />
    </PrivateRoute>
  }
/>
    </Routes>
    </CartContextProvider>
    </AuthProvider>
  </BrowserRouter>
    </div>

  )
}

export default App
