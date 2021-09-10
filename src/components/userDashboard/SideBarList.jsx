import SidebarRow from './SidebarRow';
import React, { useState, useContext } from 'react';
import { StatesContext } from '../../App';

const SideBarList = () => {
    const {
        allChannels,
        setShowCreateChannelForm,
    } = useContext(StatesContext);

    const [showAddButton, setShowAddButton] = useState(false);

    const displayAllAvailableChannels = (allChannels) => {    
        if (allChannels !== undefined && allChannels.length > 0) {
            return (
                allChannels.map((channel, index) => {
                    return(
                        <SidebarRow
                            key={index}
                            channel={channel}
                        >
                            {channel.name}
                        </SidebarRow>
                    )
                })
            )
        } else {
            return (<h3>No available channels yet</h3>)
        }
    }
        return (
            <div className="
            flex flex-col flex-grow min-h-0 mb-1
            ">
                <h1
                onMouseOver={() => setShowAddButton(true)}
                onMouseOut={() => setShowAddButton(false)}
                onClick={() => setShowCreateChannelForm(true)}
                className="
                font-semibold text-lg py-2
                cursor-pointer
                ">
                    Channels <span className={showAddButton ? "text-xl": "text-gray-300 text-xl"}>+</span>
                </h1>
                <ul className="flex flex-col overflow-y-auto">
                    {displayAllAvailableChannels(allChannels)}
                    {/* add channels button */}
                    <button type="button" onClick={() => setShowCreateChannelForm(true)} className="
                    flex items-center justify-start
                    my-1 py-1 px-3
                    bg-purple-700 hover:bg-purple-800 text-white
                    rounded-md
                    transition duration-200 cursor-pointer
                    ">
                        <div className="">+</div>
                        <div className="ml-2">Add channels</div>
                    </button>
                </ul>
            </div>
        )
    }


export default SideBarList;