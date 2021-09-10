import React, { useState, useContext, useEffect } from 'react';
import Select from 'react-select';
import { API, StatesContext } from '../../App';

const AddDirectMessage = () => {
    const { 
        loginUser,
        allUsers, 
        currentChatId,
        setCurrentChatId,
        currentChatType,
        setCurrentChatType,
        currentChatName,
        setCurrentChatName,
        setCurrentChatMembers,
    } = useContext(StatesContext);

    const [answer, setAnswer] = useState([])
    
    let allUsersOptions = allUsers.map((indivUser) => {
        return {
            value: indivUser.id,
            label: `${indivUser.uid}`,
        }
    })

    useEffect(() => {
        setCurrentChatType("User")
        setCurrentChatId(answer.value)
        setCurrentChatName(answer.label)
        setCurrentChatMembers([])
    }, [answer])

    return (
        <form className="
        flex flex-col items-center justify-center flex-grow-0
        h-20 mt-2
        ">
            <h1 className="
            font-semibold text-lg self-start
            ">
                Direct Messages
            </h1>
            <div className="
            flex flex-col justify-center items-center
            w-full
            ">
                <Select
                    options={allUsersOptions}
                    isSearchable
                    required
                    placeholder="Select from this list"
                    className="w-full text-left"
                    menuPlacement="auto"
                    onChange={setAnswer}
                />
            </div>
        </form>
    )
}

export default AddDirectMessage;