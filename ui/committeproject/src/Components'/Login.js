import React from 'react'
import axios, { Axios } from 'axios'
import '../css/Login.css'
const Login = () => {
    const loginFun=()=>{
  
  console.log("hello")
  window.open("http://localhost:5000/auth/google", "_self");
  
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

                    <a class="btn btn-lg btn-google btn-block  btn-outline" onClick={loginFun}><img className='logo'
                            src="data:image/png;base64,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"/>
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
