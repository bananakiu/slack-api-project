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
        if(data.user_id?.label !== undefined && data.user_id?.value !== undefined) {
            // console.log(data)
            setCurrentChatName(data.user_id.label);
            setCurrentChatType("User");
            setCurrentChatId(data.user_id.value);
        }
    }

    let allUsersOptions = allUsers.map((indivUser) => {
        return {
            value: indivUser.id,
            label: `${indivUser.uid}`,
        }
    })

    return (
            <form onSubmit={handleSubmit(onSubmit)} className="
            flex flex-col items-center justify-center flex-grow-0
            h-20 mt-2
            ">
                <h1 className="
                font-semibold text-lg self-start
                ">Direct Messages</h1>
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
                w-full
                ">
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
                                // onChange={()=>handleSubmit(onSubmit)}
                                menuPlacement="auto"
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