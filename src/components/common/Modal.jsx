import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';

function Modal(props) {
    // close modal upon pressing ESC key
    useEffect(() => {
        const close = (e) => {
            if(e.key === "Escape"){
                closeModal();
            }
        }

        window.addEventListener('keydown', close);

        return () => window.removeEventListener('keydown', close);
    }, [])

    const closeModal = () => {
        // run custom function
        if (props?.closeModalFunction !== undefined) {
            props.closeModalFunction();
        }

        // close modal
        props.setShowModal(false);
    }

    // close model when background is clicked
    const handleClickFocus = (e) => {
        if (e.currentTarget === e.target) {
            closeModal();
        }
    }

    // render
    return <>
        <div onFocus={handleClickFocus} tabIndex="-1" className={`
        h-screen w-full fixed z-20 inset-0 overflow-y-auto
        flex justify-center items-center text-center
        bg-black bg-opacity-50
        `}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16" className="
            fixed z-30 top-0 right-0
            mr-5 mt-3
            hover:text-white
            ">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
            {props.children}
        </div>
    </>
}

// TODO: currently doesn't work. Will fix this in future versions
Modal.propTypes = {
    closeModalFunction: PropTypes.func,
    setShowModal: PropTypes.func.isRequired,
};

export default Modal
