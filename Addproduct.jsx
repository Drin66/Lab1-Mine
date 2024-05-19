import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [produkt, setProdukt] = useState({
    emri: "",
    pershkrimi: "",
    cmimi: null,
    foto: null, // Change to null for file upload
  });
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    // If the event target is a file input, set the file to the state
    if (e.target.type === "file") {
      setProdukt((prev) => ({ ...prev, foto: e.target.files[0] }));
    } else {
      // Otherwise, handle regular input changes
      setProdukt((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("emri", produkt.emri);
      formData.append("pershkrimi", produkt.pershkrimi);
      formData.append("cmimi", produkt.cmimi);
      formData.append("foto", produkt.foto); // Append the file to FormData

      await axios.post("http://localhost:3003/produktet", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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
        type="file" // Change input type to file
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
