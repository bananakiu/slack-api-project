import axios from 'axios';
import React from 'react';
import { API, StatesContext } from '../../App';
import { useState, useEffect, useContext } from 'react';
import GetAllChannels from './GetAllChannels';

const Chat = () => {
  const {
    loginHeaders,
    allMessages,
    setAllMessages,
    currentChatType,
    currentChatId,
    currentChatName,
    currentChatMembers,
    updateMessagesTracker,
    setUpdateMessagesTracker,
  } = useContext(StatesContext);
  
  const retrieveAllMessages = () => {
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
      if (response.data.error !== undefined) {
        // TODO: error logged but not handled
        console.log(response.data.error);
      } else {
        // console.log(response.data.data);
        const retrieveMessages = (response.data.data);
        // Make a useState for retrieving messages 
        setAllMessages(retrieveMessages);
        setUpdateMessagesTracker(updateMessagesTracker+1); // change to trigger useEffect to update messages
      }
    })
    .catch((error) => {
      console.error(error?.response?.data?.errors); 
    })
  }


  useEffect(() => {
    retrieveAllMessages();
  }, [currentChatId, updateMessagesTracker])

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
    '>
      <>
        <div className='flex justify-between p-5 border-b-2 border-lightgray-600'>
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
        <div>
          { currentChatId !== null && allMessages !== undefined && allMessages.length > 0 &&
            allMessages.map((message, index) => (<p key={index}>{message.body}</p>))
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
      </>
    </div>
  );
};

export default Chat;
