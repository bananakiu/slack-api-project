import React, { useState, useContext } from 'react';
import Modal from '../common/Modal';
import ErrorDisplay from '../common/ErrorDisplay';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { API, StatesContext } from '../../App';

const AddDirectMessage = () => {
    const { register, handleSubmit, control } = useForm();

    const { 
        loginUser, allUsers, 
        currentChatId, setCurrentChatId,
        currentChatType,setCurrentChatType,
        currentChatName,setCurrentChatName} = useContext(StatesContext);

    const onSubmit = (data) => {
        console.log(data)
        if(data.user_id?.label !== undefined && data.user_id?.value !== undefined) {
            // console.log(data)
            setCurrentChatName(data.user_id.label);
            setCurrentChatId(data.user_id.value);
            setCurrentChatType("User");
        }
    }

    let allUsersOptions = allUsers.map((indivUser) => {
        return {
            value: indivUser.id,
            label: `${indivUser.uid}`,
        }
    })

    return (
            <form onSubmit={handleSubmit(onSubmit)} tabIndex="-1" className="
            flex flex-col items-center justify-center h-30 w-50 mb-3 bg-gray-100 rounded-2xl object-scale-down
            ">
                <h1 className="
                self-start text-left
                text-2xl font-bold
                mb-4
                ">
                    Add a person to chat with!
                </h1>
                {/* {errors.length>0 &&
                    <div className="
                    flex flex-col justify-center items-center
                    w-full mb-4
                    ">
                        <ErrorDisplay errors={errors}/>
                    </div>
                } */}
                <div className="
                flex flex-col justify-center items-center
                mb-4
                w-full
                ">
                    <label htmlFor="user_id" className="self-start">Chat with: </label> 
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
                                placeholder="Select from this list"
                                className="w-full text-left"
                                setValue={handleSubmit(onSubmit)}
                                // onChange={handleSubmit(onSubmit)}
                                // styles={}
                            />
                        )}
                    />
                </div>
            </form>
    )
}

export default AddDirectMessage;