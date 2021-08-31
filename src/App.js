import Login from "./components/login/Login";
import Signup from "./components/login/Signup";
import UserDashboard from "./components/userDashboard/UserDashboard";
import React, {useState} from "react";
export const API = "http://206.189.91.54";


function App() {
  const [isOpenLoginPage, setIsOpenLoginPage] = useState(true);
  const [isOpenSignUpPage, setIsOpenSignUpPage] = useState(false);
  const [isOpenUserDashboard, setIsOpenUserDashboard] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [client, setClient] = useState("");
  const [expiry, setExpiry] = useState("");
  const [uid, setUid] = useState("");

  const openPage = (page) => {
    setIsOpenLoginPage(page==="login" ? true : false);
    setIsOpenSignUpPage(page==="signup" ? true : false);
    setIsOpenUserDashboard(page==="dashboard" ? true : false);
}

  return (
    <div>
      {isOpenLoginPage && <Login
        openPage={openPage}
        accessToken={accessToken}
        setAccessToken={setAccessToken}
        client={client}
        setClient={setClient}
        expiry={expiry}
        setExpiry={setExpiry}
        uid={uid}
        setUid={setUid}
      />}
      {isOpenUserDashboard && <UserDashboard />}
      {isOpenSignUpPage && <Signup openPage={openPage}/>}
    </div>
  );
}

export default App;

