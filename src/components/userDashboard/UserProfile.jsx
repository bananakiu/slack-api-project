import React from 'react';

const UserProfile = (props) => {

    return (
        <>
            <div className="flex flex-col items-center justify-center h-full w-50 bg-gray-100 rounded-2xl overflow-hidden">
                
            <img class="rounded-full border border-red-500 shadow-inner p-3 mt-2" src="https://randomuser.me/api/portraits/men/22.jpg" alt="user image" />
                <div className="text-base px-2 py-2 font-bold"> {props.loginUser.uid}</div>
                <div className="text-sm pb-2 font-bold"> {props.loginUser.id}</div>
            </div>
        </>
    )
}

export default UserProfile;

