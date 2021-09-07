import React, { useState, useContext } from 'react';
import Modal from '../common/Modal';
import ErrorDisplay from '../common/ErrorDisplay';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import axios from "axios";
import { API, StatesContext } from '../../App';

// TODO: change style of react-select selector

const AddMemberForm = () => {
    const { register, handleSubmit, control } = useForm();
    const [ errors, setErrors ] = useState([]);

    const { 
        loginHeaders,
        allUsers,
        setShowAddMemberForm,
        currentChatId,
        currentChatMembers,
    } = useContext(StatesContext);
    
    const onSubmit = (data) => {
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
        
                // close modal
                setShowAddMemberForm(false);
            }
        })
    }

    // preprocessing form inputs
    let allUsersOptions = allUsers.map((indivUser) => {
        return {
            value: indivUser.id,
            label: `${indivUser.id} | ${indivUser.uid}`,
        }
    })

    // filter out existing members of the channel
    allUsersOptions = allUsersOptions.filter((indivUser) => !currentChatMembers.includes(indivUser.value));

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
                    Add a member
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
                    <label htmlFor="user_id" className="self-start">Add People</label> 
                    <Controller
                        name="user_id"
                        isClearable
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={allUsersOptions}
                                isSearchable
                                required
                                placeholder="Person to add"
                                className="w-full text-left"
                                // styles={}
                            />
                        )}
                    />
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