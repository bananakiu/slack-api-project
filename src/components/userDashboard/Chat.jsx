import axios from 'axios';
import React from 'react';
import { API, StatesContext } from '../../App';
import { useState, useEffect, useContext } from 'react';
import GetAllChannels from './GetAllChannels';
import ChatBox from './ChatBox';

export const retrieveAllMessages = (loginHeaders, setAllMessages) => {
  axios({
    method: 'GET',
    url: `${API}/api/v1/messages?receiver_id=1&receiver_class=Channel`,
    headers: {
      "access-token": loginHeaders['access-token'],
      client: loginHeaders.client,
      expiry: loginHeaders.expiry,
      uid: loginHeaders.uid,
    },
  }).then((response) => {
    // console.log(response.data.data);
    const retrieveMessages = (response.data.data);
    // Make a useState for retrieving messages 
    setAllMessages(retrieveMessages);
  })
  .catch((error) => {
    console.error(error.response.data.errors); 
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
  } = useContext(StatesContext);
  
  retrieveAllMessages(loginHeaders, setAllMessages);

  useEffect(() => {
    retrieveAllMessages(loginHeaders, setAllMessages);
  }, [currentChatId])

  // const sendMessages = () => {
  //   axios({
  //     method: 'POS',
  //     url: `${API}/api/v1/messages`,
  //     headers: {
  //       "ac"
  //     }
  //   })
  // }

  return (
    // Chat container
    <div className='
    flex-col flex-grow
    ml-6
    rounded-2xl shadow-inner
    bg-gray-50
    h-full
    border-8
    '>
        <div className='flex flex-none justify-between p-5 border-b-2 border-lightgray-600 h-16'>
          <div>
            <h4 className={`flex lowercase ${currentChatId === null ? "capitalize" : ""}`}>
              <strong>{`${currentChatId === null ? "No Channel/User Selected" : currentChatName}`}</strong>
            </h4>
          </div>

          <div>
            <p>Details</p>
          </div>
        </div>

        {/*List out all the messages */}
        <div className='mt-5 overflow-y-auto flex-grow'>
          { currentChatId !== null && allMessages !== undefined && allMessages.length > 0 &&
            allMessages.map((message, index) => (<p key={index} className='m-1 mb-2 py-2 px-3 max-w-max border-gray-300 border-2 rounded-lg '> {message.body}</p>))
          }
          {/* default message */}
          { currentChatId !== null && allMessages !== undefined && allMessages.length === 0 &&
            <p>No message history.</p>
          }
          {/* default message */}
          { currentChatId === null &&
            <p>Select a channel or user to chat with.</p>
          }
        </div>

        {/* Chat box component */}
        <ChatBox />
    </div>
  );
};

export default Chat;
