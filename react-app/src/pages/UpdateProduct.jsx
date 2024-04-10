import axios from "axios";
import React, { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";

const UpdateProduct = () => {
  const [produkt, setProdukt] = useState({
    emri: "",
    pershkrimi: "",
    cmimi: "",
    foto: "",
  });

  const navigate = useNavigate()
  const location = useLocation()

  const produktId = location.pathname.split("/")[2];

  console.log(location.pathname.split("/")[2]);

  // const [error, setError] = useState(false);

  const handleChange = (e) => {
    setProdukt((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async e =>{
    e.preventDefault()
    try{
      await axios.put("http://localhost:3003/produktet/" + produktId, produkt);
      navigate("/produktet")
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className="form">
      <h1 className="h1-prod">Update the Product</h1><br/>
      <input
        type="text"
        placeholder="Product name"
        name="emri"
        onChange={handleChange}
      /><br/><br/>
      <textarea
        rows={5}
        type="text"
        placeholder="Product description"
        name="pershkrimi"
        onChange={handleChange}
      /><br/><br/>
      <input
        type="number"
        placeholder="Product price"
        name="cmimi"
        onChange={handleChange}
      /><br/><br/>
      <input
        type="text"
        placeholder="Product image URL"
        name="foto"
        onChange={handleChange}
      /><br/><br/>
      <button className='updateButton' onClick={handleClick}>Update</button>
      {/* {error && "Something went wrong!"} */}
    </div>
  );
};

export default UpdateProduct;
