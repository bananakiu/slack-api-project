import React from 'react';

const Chat = () => {
  return (
    // Chat container
    <div className='
    flex-col flex-grow
    ml-6
    rounded-2xl shadow-inner
    bg-gray-50  
    '>
      <>
        <div className='flex justify-between p-5 border-b-2 border-lightgray-600'>
          <div>
            <h4 className='flex lowercase'>
              <strong>#Room-name</strong>
            </h4>
          </div>

          <div>
            <p>Details</p>
          </div>
        </div>

        {/*List out all the messages */}
        <div className=''></div>
      </>
    </div>
  );
};

export default Chat;
