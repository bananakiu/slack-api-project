import React from 'react';

function SidebarRow(props) {
    return (
        <div className="
        flex justify-between align-center
        m-1 py-2 px-3
        border-gray-200 border-2 rounded-lg
        hover:shadow-md
        transition duration-200
        " key={props.key}>
            {props.children}
        </div>
    )
}

export default SidebarRow;
