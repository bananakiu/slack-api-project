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
  } = useContext(StatesContext);
  
  const retrieveAllMessages = () => {
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


  useEffect(() => {
    retrieveAllMessages();
  }, [])

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
            <h4 className='flex lowercase'>
              <strong>#Room-name</strong>
            </h4>
          </div>

          <div>
            <p>Details</p>
          </div>
        </div>

        {/*List out all the messages */}
        <div>
          {/* {console.log(allMessages)} */}
          {allMessages.map((message, index) => (<p key={index}>{message.body}</p>))}
        </div>s
      </>
    </div>
  );
};

export default Chat;
