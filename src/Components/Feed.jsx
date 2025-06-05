import  { useEffect } from 'react'
import publicRequest from '../utils/requestMethods'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {

    const dispath = useDispatch();
    const feed = useSelector((store)=>store.feed);

    const getFeed = async() =>{
        if(feed) return;
        try {
            const res = await publicRequest.get('/user/feed',{withCredentials:true});
            dispath(addFeed(res.data.data));
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getFeed()
    },[])

  return (
   feed &&  <div className='flex justify-center my-10' >
        <UserCard user={feed[0]} />
    </div>
  )
}

export default Feed