import axios from 'axios';
import { API } from '../../App';
import { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
import GetAllChannels from './GetAllChannels';
import CreateNewChannelForm from './CreateNewChannelForm';
import Chat from './Chat';
import UserProfile from './UserProfile';

const UserDashboard = (props) => {
    const [allUsers, setAllUsers] = useState({});
    const [allChannels, setAllChannels] = useState({});
    const [showCreateChannelForm, setShowCreateChannelForm] = useState(false);

  const getAlluserData = () => {
    // GET all users
    axios({
      method: 'GET',
      url: `${API}/api/v1/users`,
      headers: {
        'access-token': props.loginHeaders['access-token'],
        client: props.loginHeaders.client,
        // client: "mikyle",
        expiry: props.loginHeaders.expiry,
        uid: props.loginHeaders.uid,
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
                "access-token": props.loginHeaders["access-token"],
                client: props.loginHeaders.client,
                expiry: props.loginHeaders.expiry,
                uid: props.loginHeaders.uid,
            },
        }).then((response) => {
            const allAvailableChannels = (response.data.data);
            setAllChannels(allAvailableChannels);
        }).catch((error) => {
            console.error(error.response.data.errors);
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
        py-4 px-6 my-4 mx-6
        w-4/5 h-4/5 
        '>
          <div className="
          // flex flex-col
        bg-white rounded-lg shadow-lg
        py-4 px-6 my-4 mx-6
        ">
            <UserProfile loginUser={props.loginUser} />
            <GetAllChannels allChannels={allChannels} />
          </div>
          <Chat />
        </div>
      </div>

      

      {/* Modals */}
      <div >
          {showCreateChannelForm && allUsers.length > 0 && <CreateNewChannelForm
              setShowModal={setShowCreateChannelForm}
              allUsers={allUsers}
              loginHeaders={props.loginHeaders}
              loginUser={props.loginUser}
          />}
      </div>
    </>
  );
};

export default UserDashboard;
