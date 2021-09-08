import React, { useState, useContext } from 'react';
import Modal from '../common/Modal';
import ErrorDisplay from '../common/ErrorDisplay';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import axios from 'axios';
import { API, StatesContext } from '../../App';

const AddDirectMessage = () => {
    const { register, handleSubmit, control } = useForm();

    const { loginUser, allUsers} = useContext(StatesContext);

    const onSubmit = (data) => {

    }

    let allUsersOptions = allUsers.map((indivUser) => {
        return {
            value: indivUser.id,
            label: `${indivUser.id} | ${indivUser.uid}`,
        }
    })

    return (
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
                    Add a person to chat with!
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
                        Select User!
                    </button>
                </div>
            </form>
    )
}

export default AddDirectMessage;