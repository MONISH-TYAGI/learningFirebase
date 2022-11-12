import React, { createContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged
 } from "firebase/auth";
export const AuthContext = createContext();



export function AuthProvider({children}) {
    const [user,setUser]=useState("");
    const [loading,setLoading]=useState(true)
    // e.preventDefault();
    function signUp(email,password)
    {
        console.log("signUp firebase");
       return  createUserWithEmailAndPassword(auth,email, password)
        
    }
    function login(email,password)
{
    // return auth().signInWithEmailAndPassword(email,password);
}
function logout(){
    // return auth().signOut()
}
useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        setUser(user)
        
      }
      else {
      //   // User is signed out
        setUser('')
      }
    })
    setLoading(false);
  },[])

const store={
    signUp,login,logout
}
  return (
    <AuthContext.Provider value={store}>
      {!loading&&children}
    </AuthContext.Provider>
  )
}


