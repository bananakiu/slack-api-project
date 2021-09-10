import SidebarRow from './SidebarRow';
import React, { useContext } from 'react';
import { StatesContext } from '../../App';

const SideBarList = () => {
    const { allChannels } = useContext(StatesContext);

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
            flex flex-col flex-grow min-h-0
            ">
                <h1 className="
                font-semibold text-lg py-2
                ">Channels</h1>
                <ul className="flex flex-col overflow-y-auto">
                    {displayAllAvailableChannels(allChannels)}
                </ul>
            </div>
        )
    }


export default SideBarList;