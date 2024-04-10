import React, { useState } from 'react';
import { useNavigate,useLocation } from "react-router-dom";
import axios from "axios";


const Update = () => {
  const [user, setUser] = useState({
    name:"",
    surname:"",
    email:"",
    username:"",
    password:"",
  });

  const navigate = useNavigate()
  const location = useLocation()

  const userId = location.pathname.split("/")[2];

  console.log(location.pathname.split("/")[2]);

  const handleChange = (e) =>{
    setUser(prev=>({...prev, [e.target.name]: e.target.value}));
  };

  const handleClick = async e =>{
    e.preventDefault()
    try{
      await axios.put("http://localhost:3003/users/" + userId, user);
      navigate("/")
    }catch(err){
      console.log(err)
    }
  }

  console.log(user);
  return (
    <div className='form'><br/>
      <h1 className='h1-design'>Update User Below</h1><br/><br/>
      <input type="text" placeholder='name' onChange={handleChange} name="name"/><br/><br/>
      <input type="text" placeholder='surname' onChange={handleChange} name="surname"/><br/><br/>
      <input type="text" placeholder='email' onChange={handleChange} name="email"/><br/><br/>
      <input type="text" placeholder='username' onChange={handleChange} name="username"/><br/><br/>
      <input type="text" placeholder='password' onChange={handleChange} name="password"/><br/><br/>
      <button className='updateButton' onClick={handleClick}>Update</button>
    </div>
  );
};

export default Update;