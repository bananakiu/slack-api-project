import React from 'react';

export default function GetAllChannels(props) {
    const displayAllAvailableChannels = (props) => {
        const {channels, allChannels} = props;
    
        if (allChannels !== undefined && allChannels.length > 0) {
            return (
                allChannels.map((channel, index) => {
                    // console.log(allChannels);
                    return(
                        <div className="
                        flex justify-between align-center m-1 py-2 px-3
                        border-gray-200 border-2 rounded-lg
                        hover:shadow-md
                        transition duration-200
                        flex-shrink" key={index}>{channel.name}</div>
                    )
                })
            )
        } else {
            return (<h3>No available channels yet</h3>)
        }
    }
        return (
            <>
                <div className="flex flex-col w-56 bg-white rounded-2xl overflow-hidden">
                    <h1 className="text-3xl uppercase text-red-500">Channels</h1>
                    <ul className="flex flex-col py-4 ">
                        {displayAllAvailableChannels(props)}
                    </ul>
                </div>
            </>
        )
    }


// export default GetAllChannels(props);