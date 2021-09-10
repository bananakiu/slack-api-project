import axios from 'axios';
import { API, StatesContext } from '../../App';
import { useState, useEffect, useContext } from 'react';
import SideBarList from './SideBarList';
import CreateNewChannelForm from './CreateNewChannelForm';
import Chat from './Chat';
import UserProfile from './UserProfile';
import AddMemberForm from './AddMemberForm';
import AddDirectMessage from './AddDirectMessage';
import { retrieveAllMessages } from './Chat';

const UserDashboard = () => {
  const {
    loginHeaders,
    allUsers,
    setAllUsers,
    allChannels,
    setAllChannels,
    showCreateChannelForm,
    showAddMemberForm,
    allChannelsDetails,
    setAllChannelsDetails,
    currentChannelId,
    setAllMessages,
    currentChatId,
    currentChatType,
  } = useContext(StatesContext);

  const getAlluserData = () => {
    // GET all users
    axios({
      method: 'GET',
      url: `${API}/api/v1/users`,
      headers: {
        'access-token': loginHeaders['access-token'],
        client: loginHeaders.client,
        // client: "mikyle",
        expiry: loginHeaders.expiry,
        uid: loginHeaders.uid,
      },
    })
      .then((response) => {
        // console.log(response.data.data) // ! TEMP
        setAllUsers(response.data.data);
        
      })
      .catch((error) => {
        console.error(error.response.data.errors); // ! TEMP
      })
      .then(() => {
        // handle errors
      });
  };

  const getAllChannels = () => {
    axios({
      method: 'GET',
      url: `${API}/api/v1/channels`,
      headers: {
        "access-token": loginHeaders["access-token"],
        client: loginHeaders.client,
        expiry: loginHeaders.expiry,
        uid: loginHeaders.uid,
      },
    }).then((response) => {
      const allAvailableChannels = (response.data.data);
      setAllChannels(allAvailableChannels);
      return allAvailableChannels;
    }).then((channelData) => {
      if (channelData) {
        getAllChannelDetails(channelData);
      } else {
        setAllChannelsDetails([]);
      }
    }).catch((error) => {
      console.error(error?.response?.data?.errors);
    })
  }

  const getAllChannelDetails = (allAvailableChannels) => {
    let channelDetailsList  = [];
    allAvailableChannels.forEach(channel => {
      axios({
        method: 'GET',
        url: `${API}/api/v1/channels/${channel.id}`,
        headers: {
          "access-token": loginHeaders["access-token"],
          client: loginHeaders.client,
          expiry: loginHeaders.expiry,
          uid: loginHeaders.uid,
        },
      }).then((response) => {
        channelDetailsList.push(response.data.data);
        setAllChannelsDetails(channelDetailsList);
      }).catch((error) => {
        console.error(error.response.data.errors);
      })
    })
  }

  useEffect(() => {
      getAllChannels();
      getAlluserData();
  }, [])

  useEffect(() => {
    retrieveAllMessages(loginHeaders, setAllMessages, currentChatId, currentChatType);
    console.log(currentChatType)
  }, [currentChatId])

  return (
    <>
      {/* background */}
      <div className='
      py-6 bg-gradient-to-b from-purple-300 to-purple-500
      flex items-center justify-center
      w-full h-screen
      border-box
      '>
        {/* card */}
        <div
        className='
        flex justify-center
        bg-white rounded-lg shadow-lg
        py-10 px-6
        w-4/5 h-full 
        '>
          {/* sidebar */}
          <div className="
          flex flex-col justify-between
          w-56 h-full
          ">
            <UserProfile />
            <SideBarList />
            {/* <div className="flex-grow border-8 overflow-y-auto">
              <div className="text-9xl">X</div>
              <div className="text-9xl">X</div>
              <div className="text-9xl">X</div>
            </div> */}
            {allUsers.length > 0 && <AddDirectMessage  />}
          </div>
          {/* chat box */}
          <Chat />
        </div>
      </div>

      {/* Modals */}
      <div >
        {showCreateChannelForm && allUsers.length > 0 && <CreateNewChannelForm />}
      </div>
      <div>
        {showAddMemberForm && allUsers.length > 0 && <AddMemberForm />}
      </div>
    </>
  );
};

export default UserDashboard;