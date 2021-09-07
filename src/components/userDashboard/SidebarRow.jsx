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
        setCurrentChatType("channel");
        setCurrentChatMembers(thisChannelMembers);

        // ! TEMP
        setShowAddMemberForm(true);
    }

    return (
        <div onClick={() => handleClick()}
        className="
        flex justify-between align-center
        m-1 py-2 px-3
        border-gray-200 border-2 rounded-lg
        hover:shadow-md cursor-pointer
        transition duration-200
        ">
            {props.children}
        </div>
    )
}

export default SidebarRow;
