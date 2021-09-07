import Login from './components/login/Login';
import Signup from './components/login/Signup';
import UserDashboard from './components/userDashboard/UserDashboard';
import React, { useState } from 'react';

export const API = 'http://206.189.91.54';
export const StatesContext = React.createContext();

function App() {
  const [isOpenLoginPage, setIsOpenLoginPage] = useState(true);
  const [isOpenSignUpPage, setIsOpenSignUpPage] = useState(false);
  const [isOpenUserDashboard, setIsOpenUserDashboard] = useState(false);
  const [loginHeaders, setLoginHeaders] = useState({});
  const [loginUser, setLoginUser] = useState({});
  const [allUsers, setAllUsers] = useState({});
  const [allChannels, setAllChannels] = useState({});
  const [showCreateChannelForm, setShowCreateChannelForm] = useState(false);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [currentChatType, setCurrentChatType] = useState(null);
  const [currentChatName, setCurrentChatName] = useState(null);
  const [allMessages, setAllMessages] = useState([]);


  const openPage = (page) => {
    setIsOpenLoginPage(page==="login" ? true : false);
    setIsOpenSignUpPage(page==="signup" ? true : false);
    setIsOpenUserDashboard(page==="dashboard" ? true : false);
  }


  return <>
    <StatesContext.Provider value={{
      openPage,
      isOpenLoginPage,
      setIsOpenLoginPage,
      isOpenSignUpPage,
      setIsOpenSignUpPage,
      isOpenUserDashboard,
      setIsOpenUserDashboard,
      loginHeaders,
      setLoginHeaders,
      loginUser,
      setLoginUser,
      allUsers,
      setAllUsers,
      allChannels,
      setAllChannels,
      showCreateChannelForm,
      setShowCreateChannelForm,
      currentChatId,
      setCurrentChatId,
      currentChatType,
      setCurrentChatType,
      currentChatName,
      setCurrentChatName,
      allMessages,
      setAllMessages
    }}>
      <div>
        {isOpenLoginPage && <Login/>}
        {isOpenUserDashboard && <UserDashboard/>}
        {isOpenSignUpPage && <Signup/>}

      </div>
    </StatesContext.Provider>
  </>
};

export default App;
