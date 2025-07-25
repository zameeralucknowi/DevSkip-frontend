import React, { useEffect } from 'react';
import publicRequest from '../utils/requestMethods';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connectionSlice';
import { Link } from 'react-router';

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);

  const fetchConnections = async () => {
    try {
      const res = await publicRequest.get('/user/request/connections',{withCredentials:true});
      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0)
    return <h1 className="text-center text-2xl mt-10">No Connections Yet!!!</h1>;

  return (
    <div className="flex flex-col items-center justify-center px-4 md:px-10 py-10">
      <h1 className="text-3xl font-bold mb-8">Connections</h1>

      <div className="w-full max-w-3xl space-y-6 my-5">
        {connections.map((connection) => {
          const { _id, firstName, lastName, age, gender, about, photoUrl } = connection;
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

              <div className="text-center md:text-left space-y-2">
                <h2 className="text-xl font-semibold">{`${firstName}  ${lastName!=undefined?lastName:""}`}</h2>
                {age && gender && <p className="text-gray-400">{age}, {gender}</p>}
                <p className="text-gray-700">{about}</p>
              </div>

              <div className='ml-auto' >
                <Link  to={`/chat/${_id}/${firstName}`}>
                <button className='btn btn-primary' >chat</button>               
                </Link>              
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
