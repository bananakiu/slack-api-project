import axios from 'axios';
import { API } from '../../App';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import GetAllChannels from './GetAllChannels';
import CreateNewChannelForm from './CreateNewChannelForm';
import Chat from './Chat';

const UserDashboard = (props) => {
    const [allUsers, setAllUsers] = useState({});
    const [allChannels, setAllChannels] = useState({});
    const [showCreateChannelForm, setShowCreateChannelForm] = useState(true);

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
            // console.log(response.data.data) // ! TEMP
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

<<<<<<< HEAD
    return <>
        <div className="py-6">
                <div className="flex bg-gray-100 rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-2xl">
                    <div className="w-full p-8 lg:w-1/2">
                        <h2 className="text-2xl font-semibold text-gray-700 text-center">Test component for User Dashboard</h2>
                        <GetAllChannels allChannels={allChannels}/>
                    </div>
                </div>
=======
  return (
    <>
      <div className='py-6'>
        <div className='flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-2xl'>
          <div className='w-full p-8 lg:w-1/2'>
            <h2 className='text-2xl font-semibold text-gray-700 text-center'>
              Test component for User Dashboard
            </h2>
            <GetAllChannels allChannels={allChannels} />
          </div>
>>>>>>> 4b2bc480906ee9d893b35775c777fa36aff437cf
        </div>
      </div>
      <Chat />
        {/* TEMP */}
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
