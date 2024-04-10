import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [produkt, setProdukt] = useState({
    emri: "",
    pershkrimi: "",
    cmimi: null,
    foto: "",
  });
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setProdukt((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3003/produktet", produkt);
      navigate("/produktet");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1 className="h1-prod">Add New Product</h1><br/>
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
      <button className="all-products" onClick={handleClick}>Add</button><br/><br/>
      {error && "Something went wrong!"}
      <Link to="/produktet">See all products</Link>
    </div>
  );
};

export default AddProduct;
