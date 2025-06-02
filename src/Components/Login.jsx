import { useState } from 'react'
import publicRequest from '../utils/requestMethods';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router';

const Login = () => {

  const [emailId,setEmail] = useState("zameeralucknowi@gmail.com");
  const [password,setPassword] = useState("Zameer@2399");
  const dispath = useDispatch();
  const navigate = useNavigate()
  
  const handleLogin = async () =>{

      try {
        const res = await publicRequest.post('/login',
        {
          emailId,
          password
        },
      {withCredentials : true})
      dispath(addUser(res.data.data))  
      navigate('/')
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
              <legend className="fieldset-legend">Email</legend>
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