import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Users.css';

const Users = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try{
        const res = await axios.get("http://localhost:3003/users");
        setUsers(res.data);
      }catch(err){
        console.log(err);
      }
    }
    fetchAllUsers();
  },[]);
  
  const handleDelete = async (id)=>{
    try{
      await axios.delete("http://localhost:3003/users/"+ id);
      window.location.reload();
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div>
      <h1 className='h1-design'>Pet Shop Dashboard</h1> <center>
      <table style={{boxShadow: '30px 45px 60px', marginTop: '2%', fontSize: '20px', fontFamily:'sans-serif'}} border="1">
        <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Surname</th>
          <th>Email</th>
          <th>Username</th>
          <th>Password</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
        </thead>
        <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.surname}</td>
            <td>{user.email}</td>
            <td>{user.username}</td>
            <td>{user.password}</td>
            <td className='update' ><Link to={`/update/${user.id}`}>Update</Link></td>
            <td className='delete' onClick={()=>handleDelete(user.id)}>Delete</td>
          </tr>
        ))}
        </tbody>
      </table>
      </center><br/><br/>
      <button className='users-button'><Link to="/Signup">Add new User</Link></button>
    </div>
  );
};

export default Users;
