import React, { useContext } from 'react';
import { StatesContext } from '../../App';

function SidebarRow(props) {
    const { 
        currentChatName,
        setCurrentChatName,
        currentChatId,
        setCurrentChatId,
        currentChatType,
        setCurrentChatType,
        currentChatMembers,
        setCurrentChatMembers,
        allChannelsDetails,
        setShowAddMemberForm,
    } = useContext(StatesContext);

    const handleClick = () => {
        // save channel members
        let thisChannelDetails = allChannelsDetails.filter(channel => channel.id === props.channel.id)[0];
        let thisChannelMembers = thisChannelDetails.channel_members.map(memberObj => memberObj.user_id);

        // save channel details
        setCurrentChatName(props.channel.name);
        setCurrentChatId(props.channel.id);
        setCurrentChatType("Channel");
        setCurrentChatMembers(thisChannelMembers);
    }

    return (
        <div onClick={() => handleClick()}
        className={`
        flex justify-between align-center
        my-1 py-1 px-3
        bg-gray-100
        rounded-md
        hover:bg-gray-200 cursor-pointer ${props.channel.id===currentChatId ? "bg-gray-300 hover:bg-gray-300" : ""}
        transition duration-200
        `}>
            {props.children}
        </div>
    )
}

export default SidebarRow;
