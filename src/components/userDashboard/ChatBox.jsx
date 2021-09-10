import React from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { API, StatesContext } from '../../App';
import { useState, useEffect, useContext } from 'react';
import { retrieveAllMessages } from './Chat'

const ChatBox = () => {
  const {register, handleSubmit} = useForm();

  const {
    loginHeaders,
    currentChatType,
    currentChatId,
    setAllMessages,
  } = useContext(StatesContext);

  // Collects messages from form // Done
  const onSubmit = (data, e) => {
    console.log(data);
    e.target.reset();

    let createdMessage = {
      "receiver_id": currentChatId,
      "receiver_class": currentChatType,
      "body": data.message,
    }

    // POST messages to API server
    axios({
      method: 'POST',
      url: `${API}//api/v1/messages`,
      data: createdMessage, 
      headers: {
        "access-token": loginHeaders['access-token'],
        client: loginHeaders.client,
        expiry: loginHeaders.expiry,
        uid: loginHeaders.uid,
      },
    }).then((response) => {
      // Refetch messages 
      retrieveAllMessages(loginHeaders, setAllMessages, currentChatId, currentChatType);
    })
  }


  return (
    <>
      <div className='
      flex justify-between items-center flex-none
      h-16 p-4
      border-t-2 border-lightgray-600 rounded-b-2xl
      bg-gray-100'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex justify-between w-full'>
          <input type="text" autoComplete="off" placeholder="Enter your message here" name="message" {...register('message')} className='w-full m-1 mb-2 py-2 px-3 border-gray-300 border-2 rounded-lg' />
          <input type="submit" className='max-w-max bg-purple-700 hover:bg-purple-800 text-white border-purple-700 border-2 rounded-lg m-1 mb-2 py-2 px-3 cursor-pointer' />
        </form>
      </div>
    </>
  )
}

export default ChatBox
