import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router';
import publicRequest from '../utils/requestMethods';
import { removeUser } from '../utils/userSlice';
import { resetFeed } from '../utils/feedSlice';

const Navbar = () => {

  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async() =>{
    try {
      const res = await publicRequest.post('/auth/logout',{},{withCredentials:true});
      dispatch(removeUser());
      dispatch(resetFeed());
      navigate('/login')
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <>
      <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <Link to={'/feed'} className="btn btn-ghost text-xl">DevSkip💻</Link>
        </div>
        {user &&
          (<div className="flex gap-2">
              <div>Welcome {user?.firstName}</div> 
            <div className="dropdown dropdown-end mx-5 ">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="user photo"
                    src={user?.photoUrl} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                  <Link to={'/profile'}  className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to={'/connections'} >
                  Connections
                  </Link>
                  </li>
                <li>
                  <Link to={'/requests'} >
                  Requests
                  </Link>
                  </li>
                <li><a onClick={handleLogout} >Logout</a></li>
              </ul>
            </div>
          </div> )} 
      </div>
    </>

  )
}

export default Navbar