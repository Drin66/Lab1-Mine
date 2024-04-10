import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [user, setUser] = useState({
    name:"",
    surname:"",
    email:"",
    username:"",
    password:"",
  });

  const navigate = useNavigate()

  const handleChange = (e) =>{
    setUser(prev=>({...prev, [e.target.name]: e.target.value}));
  };

  const handleClick = async e =>{
    e.preventDefault()
    try{
      await axios.post("http://localhost:3003/users", user)
      navigate("/")
    }catch(err){
      console.log(err)
    }
  }

  console.log(user);
  return (
    <div className='form'><br/>
      <h1 className='h1-design'>Sign Up Below</h1><br/>
      <input type="text" placeholder='name' onChange={handleChange} name="name"/><br/><br/>
      <input type="text" placeholder='surname' onChange={handleChange} name="surname"/><br/><br/>
      <input type="text" placeholder='email' onChange={handleChange} name="email"/><br/><br/>
      <input type="text" placeholder='username' onChange={handleChange} name="username"/><br/><br/>
      <input type="text" placeholder='password' onChange={handleChange} name="password"/><br/><br/>
      <button className='signupbutton' onClick={handleClick} >Sign up</button>
    </div>
  );
};

export default Signup;
