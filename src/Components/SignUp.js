import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {useContext} from 'react'
import { AuthContext } from '../Context/AuthContext';

export default function SignUp() {
 const navigate = useNavigate();
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const {signUp}=useContext(AuthContext);
  const goToLogin=()=>{
    navigate("/login");
  }
const sigingIn=async(e)=>{
  e.preventDefault();
  console.log("Sign In");
  
  try{
  let userObj = await signUp(email,password)
  setEmail('')
setPassword('')
alert("successful signIn")
  }catch(err)
  {
    console.log("fail");
    alert("Fail signIn")
  }finally{
console.log("done");

  }
  
  


}
  return (
    <div>
      <h1>Hello SignUp</h1>
      <form>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  value={email}    onChange={(e)=>setEmail(e.target.value)}></input>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1"  value={password} onChange={(e)=>setPassword(e.target.value)}></input>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    
  </div>
  <button type="submit" className="btn btn-primary" onClick={sigingIn}>Submit</button>
  <button type="submit" className="btn btn-primary mx-2" onClick={goToLogin}>Login</button>
</form>
    </div>
  )
  }


