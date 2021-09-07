import axios from 'axios';
import { API, StatesContext } from '../../App';
import { useState, useEffect, useContext } from 'react';
import GetAllChannels from './GetAllChannels';
import CreateNewChannelForm from './CreateNewChannelForm';
import Chat from './Chat';
import UserProfile from './UserProfile';


const UserDashboard = () => {
  const {
    loginHeaders,
    allUsers,
    setAllUsers,
    allChannels,
    setAllChannels,
    showCreateChannelForm,
    allChannelsDetails,
    setAllChannelsDetails,
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
          getAllChannelDetails(allAvailableChannels);
      }).catch((error) => {
          console.error(error.response.data.errors);
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

  return (
    <>
      {/* background */}
      <div className='
      py-6 bg-red-300
      flex items-center justify-center
      w-full h-screen
      border-box
      '>
        {/* card */}
        <div
        className='
        flex justify-center
        bg-white rounded-lg shadow-lg
        py-6 px-6
        w-4/5 h-4/5 
        '>
          {/* sidebar */}
          <div className="
          flex flex-col
          bg-white rounded-lg shadow-lg
          py-4 px-6
          ">
            <UserProfile />
            <GetAllChannels allChannels={allChannels} />
          </div>
          {/* chat box */}
          <Chat />
        </div>
      </div>

      {/* temp */}
      <p>{JSON.stringify(allChannelsDetails)}</p>

      {/* Modals */}
      <div >
          {showCreateChannelForm && allUsers.length > 0 && <CreateNewChannelForm />}
      </div>
    </>
  );
};

export default UserDashboard;