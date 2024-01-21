import React from 'react';
import Register from './component/pages/auth/register';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from './component/pages/dashboard';
import Login from './component/pages/auth/login';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
