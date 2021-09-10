import React, { useContext } from 'react';
import { StatesContext } from '../../App';

const UserProfile = () => {
    const { loginUser } = useContext(StatesContext);

    return (
        <>
            <div className="
            flex flex-col items-center justify-center flex-grow-0
            bg-gray-100
            rounded-2xl shadow-inner
            py-5 h-52
            object-scale-down">
                
                <img className="
                rounded-full mb-2
                " src="https://randomuser.me/api/portraits/men/22.jpg" alt="user image" />
                <div className="font-semibold"> {loginUser.uid}</div>
            </div>
        </>
    )
}

export default UserProfile;

