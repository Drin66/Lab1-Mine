import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Users from "./pages/Users";
import Signup from "./pages/Signup";
import Update from "./pages/Update";
import Produktet from "./pages/Produktet.jsx";
import UpdateProduct from "./pages/UpdateProduct.jsx";
import AddProduct from "./pages/Addproduct.jsx";
import Login from "./pages/Login.js";
import React from 'react';
import Sidebar from "./pages/Sidebar.jsx";
import Animals from "./pages/Animals.jsx";
import Addnumber from "./pages/Addnumber.jsx";
import UpdateNumber from "./pages/UpdateNumber.jsx";
import Number from "./pages/Number.jsx";
import Category from "./pages/Category.jsx";
import UpdateCategory from "./pages/UpdateCategory.jsx";
import AddCategory from "./pages/AddCategory.jsx";

// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <div className="container">
//           <Sidebar />
//           <div className="content">
//             <Routes>
//               <Route path="/" element={<Users />} />
//               <Route path="/signup" element={<Signup />} />
//               <Route path="/update/:id" element={<Update />} />
//               <Route path="/produktet" element={<Produktet />} />
//               <Route path="/addproduct" element={<AddProduct />} />
//               <Route path="/updateproduct/:id" element={<UpdateProduct />} />
//               <Route path="/login" element={<Login />} />
//             </Routes>
//           </div>
//         </div>
//       </BrowserRouter>
//     </div>
//   );
// }
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Users />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/update/:id" element={<Update />} />
              <Route path="/produktet" element={<Produktet />} />
              <Route path="/addproduct" element={<AddProduct />} />
              <Route path="/updateproduct/:id" element={<UpdateProduct />} />
              <Route path="/login" element={<Login />} />
              <Route path="/animals" element={<Animals />} />
              <Route path="/number" element={<Number />} />
              <Route path="/addnumber" element={<Addnumber />} />
              <Route path="/updatenumber/:phone_number" element={<UpdateNumber />} />
              <Route path="/category" element={<Category />} />
              <Route path="/updatecategory/:id" element={<UpdateCategory />} /> 
              <Route path="/addcategory" element={<AddCategory />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}


export default App;
