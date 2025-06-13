import { useState } from 'react'
import publicRequest from '../utils/requestMethods';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router';

const Login = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleSignup = async () =>{
    try {
      const res = await publicRequest.post('/auth/signup',
        {firstName,lastName,password,emailId},
        {withCredentials:true});
        dispatch(addUser(res.data.data));
        navigate('/profile');
    } catch (err) {
       setError(err.response.data)
    }
  }

  const handleLogin = async () => {
    try {
      const res = await publicRequest.post('/auth/login',
        {
          emailId,
          password
        },
        { withCredentials: true })
      dispatch(addUser(res.data.data))
      navigate('/feed')
    } catch (err) {
      setError(err.response.data)
    }
  }


  return (
    <div className='flex justify-center my-6' >
      <div className="card  bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center ">{isLogin ? 'LOGIN' : 'SIGN UP'}</h2>
          <div>
            {!isLogin && <>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input type="text"
                  className="input"
                  placeholder=""
                  value={firstName}
                  onChange={(e) => setFirstName(() => e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input type="text"
                  className="input"
                  placeholder=""
                  value={lastName}
                  onChange={(e) => setLastName(() => e.target.value)}
                />
              </fieldset>
            </>
            }
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>
              <input type="text"
                className="input"
                placeholder=""
                value={emailId}
                onChange={(e) => setEmail(() => e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input type="text"
                className="input"
                placeholder=""
                value={password}
                onChange={(e) => setPassword(() => e.target.value)}
              />
            </fieldset>

          </div>
          <p className='text-red-700' >{error}</p>
          <div className="card-actions justify-center my-2">
            <button className="btn btn-primary" onClick={isLogin?handleLogin:handleSignup} >{isLogin ? 'Login' : 'Sign up'}</button>
          </div>
        </div>
        <div className='flex justify-center pb-4 cursor-pointer' onClick={()=>setIsLogin(!isLogin)}>
          <p>{isLogin ? `New User? Signup Here` : `Already have an Account? Login here`}</p>
        </div>
      </div>



    </div>
  )
}

export default Login