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
    } = useContext(StatesContext);

    const handleClick = () => {
        setCurrentChatName(props.channel.name);
        setCurrentChatId(props.channel.id);
        setCurrentChatType("channel");
    }

    return (
        <div key={props.key} onClick={() => handleClick()}
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
