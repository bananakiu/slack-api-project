import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useForm } from "react-hook-form";
import ErrorDisplay from '../common/ErrorDisplay';

const CreateNewChannelForm = (props) => {
    const { register, handleSubmit } = useForm();
    const [ errors, setErrors ] = useState([]);

    const onSubmit = (data) => {
        let errorList = [];
    
        // create channel obj
        let createdChannel = {
            name: data.name,
            user_ids: data.user_ids,
        }
        
        // // POST to server
        // axios({
        //     method: "POST",
        //     url: `${API}/api/v1/channels`,
        //     data: createdChannel,
        //     headers: {
        //         "access-token": props.loginHeaders["access-token"],
        //         client: props.loginHeaders.client,
        //         expiry: props.loginHeaders.expiry,
        //         uid: props.loginHeaders.uid,
        //     },
        // }).then((response) => {
        //     console.log("response");
        // }).catch((error) => {
        //     console.error(error.response.data.errors); // ! TEMP
        //     errorList.push(...error.response.data.errors);
        //     setErrors(errorList);
        // }).then(() => {
        //     if (errorList.length === 0) {
        //         // ! TEMP: alert (turn into nicer alerts)
        //         alert("Channel created!");

        //         // trigger updating channels in app

        //         // empty form fields
        
        //         // close modal
        //         props.setShowModal(false);
        //     }
        // })
    }

    // render
    return (
        <Modal setShowModal={props.setShowModal}>
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
                mb-2
                ">
                    Create an channel
                </h1>
                <p className="
                self-start text-left
                text-m text-gray-500
                mb-4
                ">
                    Channels are where your team communicates. They’re best when organized around a topic — #marketing, for example.
                </p>
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
                    <label htmlFor="name" className="self-start">Channel Name</label>
                    <input {...register("name")} type="text" placeholder="Channel Name"
                    autoFocus required className="
                    rounded-md
                    w-full
                    "/>
                </div>
                <div className="
                flex flex-col justify-center items-center
                mb-4
                w-full
                ">
                    <label htmlFor="user_ids" className="self-start">Add People</label>
                    <input {...register("user_ids")} type="text" placeholder="Members to Add"
                    required className="
                    rounded-md
                    w-full
                    "/>
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
                    Create
                    </button>
                </div>
            </form>
        </Modal>
    )
}

export default CreateNewChannelForm