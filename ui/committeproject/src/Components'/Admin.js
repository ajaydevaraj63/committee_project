import React from 'react'
import axios, { Axios } from 'axios'
const Admin = () => {
   const click=()=>{
    console.log("clicked")
       axios.get("http://localhost:4006/auth/Googlogin/logout").then(
        (response)=>{
           
        }
       )
    }
  return (
    <div>
      admin
      <li><a href="http://localhost:4006/auth/Googlogin/logout">Log out</a></li>
      <li><a href="http://localhost:4006/auth/Googlogin/authenticate">Authenticate</a></li>
    </div>
  )
}

export default Admin
