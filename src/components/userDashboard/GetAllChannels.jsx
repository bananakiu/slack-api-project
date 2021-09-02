import React from 'react';

export default function GetAllChannels(props) {
    const displayAllAvailableChannels = (props) => {
        const {channels, allChannels} = props;
    
        if (allChannels !== undefined && allChannels.length > 0) {
            return (
                allChannels.map((allChannels, index) => {
                    console.log(allChannels);
                    return(
                        <div>{allChannels.name}</div>
                    )
                })
            )
        } else {
            return (<h3>No available channels yet</h3>)
        }
    }
        return (
            <>
                {displayAllAvailableChannels(props)}
            </>
        )
    }


// export default GetAllChannels(props);