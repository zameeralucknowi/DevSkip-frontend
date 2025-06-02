import React from 'react'
import publicRequest from '../utils/requestMethods'

const Feed = () => {

    const getFeed =  async() =>{

        try {
            const res = await publicRequest.get('/user/feed',{withCredentials:true});
            
            
        } catch (error) {
            
        }
    }

  return (
    <div>Feed</div>
  )
}

export default Feed