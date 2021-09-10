import axios from 'axios';
import { API, StatesContext } from '../../App';
import { useState, useEffect, useContext } from 'react';
import GetAllChannels from './GetAllChannels';
import CreateNewChannelForm from './CreateNewChannelForm';
import Chat from './Chat';
import UserProfile from './UserProfile';
import AddMemberForm from './AddMemberForm';

export const getAllChannels = (loginHeaders, setAllChannels, setAllChannelsDetails, currentChatId, setCurrentChatMembers) => {
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
    // allChannels
    const allAvailableChannels = (response.data.data);
    setAllChannels(allAvailableChannels);
    return allAvailableChannels;
  }).then((response) => {
    // allChannelsDetials
    let channelDetailsList  = [];
    response.forEach(channel => {
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
        return channelDetailsList;
      }).catch((error) => {
        console.log(error);
      })
    })
  }).catch((error) => {
      console.error(error?.response?.data?.errors);
  })
}
// .then((response) => {
//   // currentChatMembers;
//   console.log(JSON.parse(JSON.stringify(response)))

//   console.log(currentChatId);
//   if (currentChatId !== null && currentChatId) {
//     let thisChannelDetails = response.filter(channel => channel.id === currentChatId)[0];
//     let thisChannelMembers = thisChannelDetails.channel_members.map(memberObj => memberObj.user_id);
//     setCurrentChatMembers(thisChannelMembers);
//   }
// })

// TODO: include whenever allChannels and allChannelsDetails get updated?
export const getAllUserData = (loginHeaders, setAllUsers) => {
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
    currentChatId,
    currentChatMembers,
    setCurrentChatMembers,
    setMemberCount,
  } = useContext(StatesContext);

  // load channel and user data on render
  useEffect(() => {
    getAllChannels(loginHeaders, setAllChannels, setAllChannelsDetails);
    getAllUserData(loginHeaders, setAllUsers);
  }, [])

  // set membercount on render
  useEffect(() => {
    setMemberCount(currentChatMembers.length);
  }, [currentChatId, showAddMemberForm])

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
        py-10 px-6
        w-4/5 h-4/5 
        '>
          {/* sidebar */}
          <div className="
          flex flex-col
          // bg-white
          ">
            <UserProfile />
            <GetAllChannels allChannels={allChannels} />
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