import React, { useContext } from 'react';
import { StatesContext } from '../../App';

const UserProfile = () => {
    const { loginUser } = useContext(StatesContext);
    console.log(loginUser);

    return (
        <>
            <div className="flex flex-col items-center justify-center h-30 w-50 mb-3 bg-gray-100 rounded-2xl object-scale-down">
                
            <img className="rounded-full border border-red-300 p-3 mt-2" src="https://randomuser.me/api/portraits/men/22.jpg" alt="user image" />
                <div className="text-base px-2 py-2 font-bold"> {loginUser.uid}</div>
            </div>
        </>
    )
}

export default UserProfile;

