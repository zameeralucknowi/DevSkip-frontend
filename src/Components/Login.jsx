import axios from 'axios';
import React, { useState } from 'react'
import publicRequest from '../requestMethods';

const Login = () => {

  const [emailId,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = async () =>{
      try {
        const res = await publicRequest.post('/login',
        {
          emailId,
          password
        },
      {
        withCredentials : true
      })

      console.log(res)
        
        
      } catch (error) {
        console.error(error)
      }
  }


  return (
    <div className='flex justify-center my-10' >
      <div className="card  bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center ">LOGIN</h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email : {emailId}</legend>
              <input type="text" 
              className="input" 
              placeholder="" 
              value={emailId}
              onChange={(e)=>setEmail(()=>e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input type="text"
               className="input" 
               placeholder="" 
               value={password}
               onChange={(e)=>setPassword(()=>e.target.value)}               
               />
            </fieldset>

          </div>
          <div className="card-actions justify-center my-2">
            <button className="btn btn-primary" onClick={handleLogin} >Login</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Login