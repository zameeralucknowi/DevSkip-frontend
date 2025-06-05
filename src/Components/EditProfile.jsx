import React, { useState, useEffect } from 'react'
import UserCard from './UserCard';
import { useDispatch, useSelector } from 'react-redux';
import publicRequest from '../utils/requestMethods';
import { addUser } from '../utils/userSlice';

const EditProfile = () => {
    const user = useSelector((store) => store.user)
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [about, setAbout] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const [error, setError] = useState("");
    const [toast,setToast] = useState(false);
    const dispath = useDispatch();

    useEffect(() => {
        if (user) {
            setFirstName(user.firstName || "");
            setLastName(user.lastName || "");
            setAge(user.age || "");
            setGender(user.gender || "");
            setAbout(user.about || "");
            setPhotoUrl(user.photoUrl || "");
        }
    }, [user]);


    const handleSaveProfile = async () => {
        setError("");
        try {
            const res = await publicRequest.patch('/profile/edit',
                {
                    firstName,
                    lastName,
                    age,
                    gender,
                    about,
                    photoUrl
                },
                { withCredentials: true }
            )
            dispath(addUser(res?.data?.data));
            setToast(true);
            setTimeout(() => {
                setToast(false)
            }, 2000);
        } catch (err) {
            setError(err.response.data)
            console.log(err)
        }
    }

    return (
        <div className='flex justify-center my-10 ' >
            <div className="card  bg-base-300 w-96 shadow-sm mr-8 ">
                <div className="card-body ">
                    <h2 className="card-title justify-center ">Edit Profile</h2>
                    <div>
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
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Age</legend>
                            <input type="text"
                                className="input"
                                placeholder=""
                                value={age}
                                onChange={(e) => setAge(() => e.target.value)}
                            />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Gender</legend>
                            <input type="text"
                                className="input"
                                placeholder=""
                                value={gender}
                                onChange={(e) => setGender(() => e.target.value)}
                            />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Photo Url</legend>
                            <input type="text"
                                className="input"
                                placeholder=""
                                value={photoUrl}
                                onChange={(e) => setPhotoUrl(() => e.target.value)}
                            />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">About</legend>
                            <input type="text"
                                className="input"
                                placeholder=""
                                value={about}
                                onChange={(e) => setAbout(() => e.target.value)}
                            />
                        </fieldset>


                    </div>
                    <p className='text-red-700' >{error}</p>
                    <div className="card-actions justify-center my-2">
                        <button className="btn btn-primary" onClick={handleSaveProfile} >Save Profile</button>
                    </div>
                </div>
            </div>
            <UserCard user={{ firstName, lastName, about, age, gender, photoUrl }} />
           {toast &&  (<div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>Profile updated successfully</span>
                </div>
            </div>)}
        </div>

    )
}

export default EditProfile