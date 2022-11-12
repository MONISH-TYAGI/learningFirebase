import React, { useContext, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext';
function Home() {
    const { logout } = useContext(AuthContext);
    const { user } = useContext(AuthContext);
    console.log("user ",user);
    const navigate=useNavigate();
    useEffect(() => {
        if (user==''){
         navigate("/login")   
        }
    },[user])
  
    const Logout=async()=>{
        await logout();
        
       navigate("/login")
       
    }
  return (
    <div>
      <h1> Hello Home </h1>
      <button onClick={Logout}>Logout</button>
    </div>
  )
}

export default Home
