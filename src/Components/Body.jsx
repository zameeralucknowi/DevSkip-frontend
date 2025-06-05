import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet, useNavigate } from 'react-router'
import publicRequest from '../utils/requestMethods'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {

  const dispath = useDispatch();
  const user = useSelector(store=>store.user);
  const navigate = useNavigate();

  const fetchUser = async() =>{
    if(user) return;   
    try {
      const res = await publicRequest.get('/profile/view',
      {withCredentials:true});

      if(res){
        dispath(addUser(res.data))
      }     
    } catch (err) {
      if(err.status === 401)
      navigate('/auth/login')
      console.error(err)
    }

  }

  useEffect(()=>{
    fetchUser();
  },[])

  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Body