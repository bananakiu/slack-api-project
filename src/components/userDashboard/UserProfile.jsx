import React, { useContext } from 'react';
import { StatesContext } from '../../App';
import DefaultPhoto from '../../assets/default_dp.png'

const UserProfile = () => {
    const { loginUser } = useContext(StatesContext);

    return (
        <>
            <div className="
            flex flex-col items-center justify-center flex-grow-0
            bg-gray-100
            rounded-2xl shadow-inner
            py-5 h-52">
                <img className="
                rounded-full object-fit h-full
                "src={DefaultPhoto} alt="user image" />
                <div className="font-semibold"> {loginUser.uid}</div>
            </div>
        </>
    )
}

export default UserProfile;

