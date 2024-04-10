import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Users from "./pages/Users";
import Signup from "./pages/Signup";
import Update from "./pages/Update";
import Produktet from "./pages/Produktet.jsx";
import UpdateProduct from "./pages/UpdateProduct.jsx";
import AddProduct from "./pages/Addproduct.jsx";
import React from 'react';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Users/>}/>
        <Route path="/signup"  element={<Signup/>}/>
        <Route path="/update/:id"  element={<Update/>}/>
        <Route path="/Produktet"  element={<Produktet/>}/>
        <Route path="/addproduct"  element={<AddProduct/>}/>
        <Route path="/updateproduct/:id"  element={<UpdateProduct/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
