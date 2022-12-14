import React from 'react'
import axios, { Axios } from 'axios'
import '../css/Login.css'
const Login = () => {
    const loginFun=()=>{
  
  console.log("hello")
  axios.get("http://localhost:5000/auth/google").then((response)=>{
    if(response){
          alert("succesfully added")

    }
    else{
          alert("error")
    }
})
   }
  return (
    <div>
       <div class="ContainerMain bg-img ">


<div class="row">
    <div class="col col-12 col-sm-12 col-md-12 col-lg-12">

        <div class="row">
            <div class="col col-12 col-sm-12 col-md-12 col-lg-12 py-4"></div>
            <div class="col col-12 col-sm-12 col-md-12 col-lg-12 py-4"></div>
            <div class="col col-12 col-sm-12 col-md-12 col-lg-12 py-4"></div>
            <div class="col col-12 col-sm-12 col-md-12 col-lg-12 py-4"></div>
            <div class="col col-12 col-sm-12 col-md-12 col-lg-12 py-4"></div>
            <div class="col col-12 col-sm-12 col-md-12 col-lg-12 py-4"></div>
            <div class="col col-12 col-sm-12 col-md-12 col-lg-12 py-4"></div>


            <div class="col col-4 ">


            </div>

            <div class=" col col-4 ">
                <div class="box zoom-in-out-box" >

                    <a class="btn btn-lg btn-google btn-block  btn-outline" onClick={loginFun}><img
                            src="https://img.icons8.com/color/16/000000/google-logo.png"/>
                        <div class="row">
                            <div class="  col col-12 SignUpText" >Signup Using
                                Google</div>
                        </div>
                    </a>

                </div>

            </div>

            <div class="col col-4 ">


            </div>


        </div>

    </div>
</div>


</div>
    </div>
  )
}

export default Login
