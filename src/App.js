import Login from "./components/login/Login";
import Signup from "./components/login/Signup";
import UserDashboard from "./components/userDashboard/UserDashboard";
import React, {useState} from "react";
export const API = "http://206.189.91.54";


function App() {
  const [isOpenLoginPage, setIsOpenLoginPage] = useState(true);
  const [isOpenSignUpPage, setIsOpenSignUpPage] = useState(false);
  const [isOpenUserDashboard, setIsOpenUserDashboard] = useState(false);
  const [loginHeaders, setLoginHeaders] = useState({});

  const openPage = (page) => {
    setIsOpenLoginPage(page==="login" ? true : false);
    setIsOpenSignUpPage(page==="signup" ? true : false);
    setIsOpenUserDashboard(page==="dashboard" ? true : false);
}

  return <>
    <div>
      {isOpenLoginPage && <Login
        openPage={openPage}
        setLoginHeaders={setLoginHeaders}
      />}
      {isOpenUserDashboard && <UserDashboard />}
      {isOpenSignUpPage && <Signup
        openPage={openPage}
        setLoginHeaders={setLoginHeaders}
      />}
    </div>
    <p>
      {JSON.stringify(loginHeaders)}
    </p>
  </>;
}
export default App;

