import { useDispatch } from "react-redux";
import publicRequest from "../utils/requestMethods";
import { removeFeed } from "../utils/feedSlice";


const UserCard = ({user}) => {

    const dispatch = useDispatch();

    const handleSendRequest = async(status,userId) =>{
        try {
            const res = await publicRequest.post(`/request/send/${status}/${userId}`,{},{withCredentials:true});
            dispatch(removeFeed(userId));

        } catch (error) {
            console.log(error)
        }
    }

    const {_id,firstName,lastName,about,photoUrl,age,gender} = user;
    return (
        <div>
            <div className="card bg-info-content w-96 shadow-sm mb-15">
                <figure>
                    <img
                        src={photoUrl || null}
                        alt="profile photo" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{firstName}</h2>
                    {age && gender && (<p>Age: {age} Gender: {gender}</p>)}
                    <p>{about}</p>
                    <div className="card-actions justify-between">
                        <button className="btn bg-red-600" onClick={()=>handleSendRequest('nope',_id)} >Nope</button>
                        <button className="btn bg-green-600" onClick={()=>handleSendRequest('dope',_id)} >Dope</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard