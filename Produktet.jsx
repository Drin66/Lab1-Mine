import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Produktet = () => {
  const [produktet, setProduktet] = useState([]);

  useEffect(() => {
    const fetchAllProduktet = async () => {
      try {
        const res = await axios.get("http://localhost:3003/produktet");
        setProduktet(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllProduktet();
  }, []);

  const handleDelete = async (id)=>{
    try{
      await axios.delete("http://localhost:3003/produktet/"+ id);
      window.location.reload();
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div>
      <h1 className='h1-topogani'>Pet Shop Products</h1>
      <div className="produktet">
        {produktet.map(produkti => (
          <div className="produkti" key={produkti.id}>
            {produkti.foto && <img src={produkti.foto} alt="" />}
            <h2>{produkti.emri}</h2>
            <p>{produkti.pershkrimi}</p>
            <span>{produkti.cmimi}</span><br/>
            <button className="delete-product" onClick={()=>handleDelete(produkti.id)}>Delete</button>
            <button className='update-product'><Link to={`/updateproduct/${produkti.id}`}>Update</Link></button>
          </div>
        ))}
      </div><br/><br/>
      <button className='shto-produktet'><Link to="/addproduct">Add new Product</Link></button>
    </div>
  );
};

export default Produktet;