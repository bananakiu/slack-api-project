import axios from 'axios';
import React from 'react';
import { API, StatesContext } from '../../App';
import { useState, useEffect, useContext } from 'react';
import ChatBox from './ChatBox';

export const retrieveAllMessages = (
  loginHeaders,
  setAllMessages,
  currentChatId,
  currentChatType,
) => {
  axios({
    method: 'GET',
    url: `${API}/api/v1/messages?receiver_id=${currentChatId}&receiver_class=${currentChatType}`,
    headers: {
      "access-token": loginHeaders['access-token'],
      client: loginHeaders.client,
      expiry: loginHeaders.expiry,
      uid: loginHeaders.uid,
    },
  }).then((response) => {
    // console.log(response.data.data);
    const retrieveMessages = response.data.data;
    // Make a useState for retrieving messages 
    setAllMessages(retrieveMessages);
  })
  .catch((error) => {
    console.error(error?.response?.data?.errors); 
  })
}

const Chat = () => {
  const {
    loginHeaders,
    allMessages,
    setAllMessages,
    currentChatType,
    currentChatId,
    currentChatName,
    currentChatMembers,
    setShowAddMemberForm,
    loginUser
  } = useContext(StatesContext);
  
  useEffect(() => {
    retrieveAllMessages(loginHeaders, setAllMessages, currentChatId, currentChatType);
  }, [currentChatId])

  return (
    // Chat container
    <div className='flex flex-col flex-grow ml-6 rounded-2xl shadow-inner bg-gray-50 h-full'>
      {/* header */}
      <div className='flex justify-between items-center flex-none border-b-2 border-lightgray-600 p-4 h-16'>
        {/* channel name */}
        <div>
          <h4 className={`flex font-bold lowercase ${currentChatId === null ? "capitalize" : ""}`}>
            {`${currentChatId === null ? "No Channel/User Selected" : currentChatName}`}
          </h4>
        </div>

        {/* member info button */}
        <div className="
        flex justify-center align-center
        ">
          {currentChatType === "Channel" &&
            <button type="button" onClick={() => setShowAddMemberForm(true)} className="
            flex justify-between align-center
            border-gray-300 border-2 hover:bg-gray-200 rounded-lg
            w-32 px-2
            text-center text-gray-500 font-semibold
            ">
              <p className="">Members</p>
              <p className="text-gray-300 font-normal">|</p>
              <p>{currentChatMembers.length}</p>
            </button>
          }
        </div>
      </div>

      {/*List out all the messages */}
      <div className='flex flex-col flex-grow p-4 overflow-y-auto'>
        { currentChatId !== null && allMessages !== undefined && allMessages.length > 0 &&
          allMessages.map((message, index) => (
            <div className={`flex flex-col mb-2 ${message.sender.id === loginUser.id ? 'self-end' : 'self-start'}`}>
              <p className='text-sm self-start ml-1'> {message.sender.uid.replaceAll("@gmail.com", "").replaceAll("@yahoo.com", "")} </p>
              <p key={index} className={`${message.sender.id === loginUser.id ? 'bg-purple-400 border-purple-400' : 'bg-gray-100'} mt-1 mb-2 py-2 px-3 max-w-max border-gray-300 border-2 rounded-lg self-start`}> {message.body}</p>
            </div>
            ))
        }
        {/* default message */}
        { currentChatId !== null && allMessages !== undefined && allMessages.length === 0 &&
          <p>No message history.</p>
        }
        {/* default message */}
        { currentChatId === null &&
          <p className='justify-self-end self-center'>Select a channel or user to chat with.</p>
        }
      </div>

      {/* Chat box component */}
      { currentChatId !== null && <ChatBox /> }
    </div>
  );
};

export default Chat;
