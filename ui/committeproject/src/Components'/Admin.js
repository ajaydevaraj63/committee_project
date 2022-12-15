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
      <li><a href="/auth/Googlogin/logout">Log out</a></li>
    </div>
  )
}

export default Admin
