import React, { useEffect} from 'react'
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
        props.setIsOpenModal(false);
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
            <div tabIndex="-1">
                {props.children}
            </div>
        </div>
    </>
}

// TODO: currently doesn't work. Will fix this in future versions
Modal.propTypes = {
    closeModalFunction: PropTypes.func,
    setIsOpenModal: PropTypes.func.isRequired,
};

export default Modal
