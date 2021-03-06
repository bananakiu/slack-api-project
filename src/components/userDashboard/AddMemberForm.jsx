import React, { useState, useContext, useEffect } from 'react';
import Modal from '../common/Modal';
import ErrorDisplay from '../common/ErrorDisplay';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import axios from "axios";
import { API, StatesContext } from '../../App';
import {getAllChannels, getAllChannelsDetails } from '../userDashboard/UserDashboard'

// TODO: change style of react-select selector
const searchMember = (allUsers, id) => {
    let memberDetails = allUsers.filter((user) => user.id === id);
    return memberDetails[0];
}

const AddMemberForm = () => {
    const { register, handleSubmit, control } = useForm();
    const [errors, setErrors] = useState([]);
    const [options, setOptions] = useState([]);

    const { 
        loginHeaders,
        allUsers,
        setShowAddMemberForm,
        currentChatId,
        currentChatMembers,
        currentChatName,
        setAllChannels,
        setAllChannelsDetails,
    } = useContext(StatesContext);
    
    const onSubmit = (data) => {
        if(data.user_id?.label !== undefined && data.user_id?.value !== undefined) {
            let errorList = [];
        
            // create request obj
            let memberToAdd = {
                id: currentChatId,
                member_id: data.user_id.value,
            }
            
            // POST to server
            axios({
                method: "POST",
                url: `${API}/api/v1/channel/add_member`,
                data: memberToAdd,
                headers: {
                    "access-token": loginHeaders["access-token"],
                    client: loginHeaders.client,
                    expiry: loginHeaders.expiry,
                    uid: loginHeaders.uid,
                },
            }).then((response) => {
                // console.log(response.data.data); // ! TEMP
            }).catch((error) => {
                console.error(error.response.data.errors); // ! TEMP
                errorList.push(...error.response.data.errors);
                setErrors(errorList);
            }).then(() => {
                if (errorList.length === 0) {
                    // ! TEMP: alert (turn into nicer alerts)
                    alert("User added to channel!");

                    // TODO: re-get allChannels and alLChannelsDetails
                    getAllChannels(loginHeaders, setAllChannels, getAllChannelsDetails, setAllChannelsDetails)

                    // close modal
                    setShowAddMemberForm(false);
                }
            })
        }
    }

    useEffect(() => {
        // preprocessing form inputs
        let allUsersOptions = allUsers.map((indivUser) => {
            return {
                value: indivUser.id,
                label: `${indivUser.uid}`,
            }
        })
        // filter out existing members of the channel
        allUsersOptions = allUsersOptions.filter((indivUser) => !currentChatMembers.includes(indivUser.value));
        setOptions(allUsersOptions);
    }, [currentChatMembers])
    

    // render
    return (
        <Modal setShowModal={setShowAddMemberForm}>
            <form onSubmit={handleSubmit(onSubmit)} tabIndex="-1" className="
            py-4 px-6
            border-gray-150 border-2 rounded-lg
            transition duration-200
            bg-white
            w-96 lg:w-4/12
            ">
                <h1 className="
                self-start text-left
                text-2xl font-bold
                mb-4
                ">
                    {`${currentChatName} members`}
                </h1>
                {errors.length>0 &&
                    <div className="
                    flex flex-col justify-center items-center
                    w-full mb-4
                    ">
                        <ErrorDisplay errors={errors}/>
                    </div>
                }
                <div className="
                flex flex-col justify-center items-center
                mb-4
                w-full
                ">
                    <label htmlFor="user_id" className="self-start">Add people</label> 
                    <Controller
                        name="user_id"
                        isClearable
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={options}
                                isSearchable
                                required
                                placeholder="Person to add"
                                className="w-full text-left"
                                // styles={}
                            />
                        )}
                    />
                </div>
                
                {/* List of Members */}
                <div className="
                flex flex-col
                ">
                    <h2 className="self-start">Current members</h2>
                    <ul className="
                    flex flex-col justify-start items-center
                    mb-4
                    border-2 rounded-lg h-72 w-full
                    overflow-y-auto	
                    ">
                        {currentChatMembers !== undefined &&
                            currentChatMembers.map((memberId, index) => {
                                let memberDetails = searchMember(allUsers, memberId)
                                return (
                                    <li key={index} className="
                                    border-b-2
                                    hover:bg-gray-50
                                    flex justify-center items-center
                                    w-full h-10 p-2
                                    ">
                                        {memberDetails.uid}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>

                <div className="
                flex justify-end items-center
                w-full
                ">
                    <button className="
                    py-2 px-4 mt-2 rounded
                    bg-blue-500 hover:bg-blue-700
                    text-white font-bold
                    ">
                    Add
                    </button>
                </div>
            </form>
        </Modal>
    )
}

export default AddMemberForm;