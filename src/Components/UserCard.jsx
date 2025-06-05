

const UserCard = ({user}) => {
    const {firstName,lastName,about,photoUrl,age,gender} = user;
    return (
        <div>
            <div className="card bg-info-content w-96 shadow-sm">
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
                        <button className="btn bg-red-600">Nope</button>
                        <button className="btn bg-green-600">Dope</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard