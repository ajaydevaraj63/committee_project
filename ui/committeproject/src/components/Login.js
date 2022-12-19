import React from 'react'

import { useState, useEffect } from 'react';
import jwt from 'jwt-decode'


import 'bootstrap/dist/css/bootstrap.min.css';

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import '../css/Login.css'
import { signIn } from '../actions/auth';
const Login = () => {
  //redux dispatch
  const dispatch = useDispatch();

  //react-router-dom navigate
  const navigate = useNavigate();
  function handleCallbackResponse(response) {
    const userDecode = jwt(response.credential)
    const FormData = { "Email": userDecode.email, "Token": response.credential }

    dispatch(signIn(FormData, navigate))

  }
  const LogOut = () => {
    //redux dispatch
    const dispatch = useDispatch();

    //react-router-dom navigate
    const navigate = useNavigate();

    // dispatch(s( navigate))

  }
  useEffect(() => {

    /* global google */

    google.accounts.id.initialize({
      client_id: "948869378175-2j4gta2nuea49a3slpap3fnnj4jqcfqm.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: 'dark', size: "large", width: "100px" }
    );

    return () => {
    }
  }, [])















  //  const loginFun=()=>{

  //   console.log("hello")
  //   window.open("http://localhost:4006/auth/Googlogin/google", "_self");

  //    }
  const successResponse = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

  };
  //google authentication  failed
  const failedResponse = () => {
    console.log("google auth error");
  };
  return (
   
//       <div class="ContainerMain bg-img ">


// <div class="container56">
//     <div class="row">
//         <div class="col-sm-6 col-md-4 col-md-offset-4">
//         <div id='signInDiv'></div>

//         </div>
//     </div>
// </div>





<div class="container3">
<div class="d-flex justify-content-center h-100">
  <div class="image_outer_container">
    <div class="green_icon"></div>
   
    <div class="image_inner_container">
    <div class="box" >
    <div class="btn" >
    <div id='signInDiv'></div>
    </div>
    </div>
    </div>
  </div>
</div>
</div>









/* 
<div class="row">
    <div class="col col-12 col-sm-12 col-md-12 col-lg-12">

        <div class="row back">
          
            <div class="col col-4 ">


            </div>

            <div class=" col col-4 ">
                <div class="box zoom-in-out-box" >

                    <a class="btn btn-lg btn-google btn-block  btn-outline" href="#"><img
                            src="https://img.icons8.com/color/16/000000/google-logo.png"/>
                        <div class="row">
                            <div class="col col-12 SignUpText"><div id='signInDiv'></div></div>
                        </div>
                    </a>

                </div>

            </div>

            <div class="col col-4 ">


            </div>


        </div>

    </div>
</div>
 */


    
    //
  )
}

export default Login
