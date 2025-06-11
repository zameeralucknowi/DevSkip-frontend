import React, { useEffect } from 'react';
import publicRequest from '../utils/requestMethods';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, removeRequest } from '../utils/requestSlice';

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const fetchRequests = async () => {
    try {
      const res = await publicRequest.get('/user/request/recieved', { withCredentials: true });
      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  const handleRequest = async(status,id) =>{
    try {
      const res = await publicRequest.post(`/request/review/${status}/${id}`,{},{withCredentials:true});
      dispatch(removeRequest(id));
    } catch (err) {
      console.log(err)
    }
  }



  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0)
    return <h1 className="text-center text-2xl mt-10">No Requests Yet!!!</h1>;

  return (
    <div className="flex flex-col items-center justify-center px-4 md:px-10 py-10">
      <h1 className="text-3xl font-bold mb-8">Requests</h1>

      <div className="w-full max-w-3xl space-y-6 my-5">
        {requests.map((request) => {
          const { _id, firstName, lastName, age, gender, about, photoUrl } = request.fromUserId;

          return (
            <div
              key={_id}
              className="flex flex-col md:flex-row items-center bg-base-200 shadow-md rounded-2xl overflow-hidden p-4 md:p-6 gap-4"
            >
              <div className="w-32 h-32 flex-shrink-0">
                <img
                  src={photoUrl || 'https://via.placeholder.com/150'}
                  alt={firstName}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              <div className="flex-1 text-center md:text-left space-y-2">
                <h2 className="text-xl font-semibold">{`${firstName} ${
                  lastName !== undefined ? lastName : ''
                }`}</h2>
                {age && gender && (
                  <p className="text-gray-400">
                    {age}, {gender}
                  </p>
                )}
                <p className="text-gray-700">{about}</p>
              </div>

              <div className="flex flex-col md:flex-row gap-2 md:gap-4 mt-4 md:mt-0 md:ml-auto">
                <button className="btn btn-primary w-full md:w-auto hover:scale-105 transition-transform duration-200" onClick={()=>handleRequest('accepted',request._id)} >
                  Accept
                </button>
                <button className="btn btn-outline btn-error w-full md:w-auto hover:scale-105 transition-transform duration-200" onClick={()=>handleRequest('rejected',request._id)} >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
