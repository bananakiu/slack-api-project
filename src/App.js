import Login from "./components/login/Login";
import Signup from "./components/login/Signup";
import UserDashboard from "./components/userDashboard/UserDashboard";
import React, {useState} from "react";
export const API = "http://206.189.91.54";


function App() {
  const [logInForm, toggleLoginForm] = useState(true);
  const [signUpForm, toggleSignUpForm] = useState(false);
  const [userDashboard, toggleUserDashboard] = useState(false);


const handleLogin = () => {
  /* TEMP HANDLER for user/channel view || Can be renamed to anything */
  // toggleUserDashboard(true); 
  toggleLoginForm(false);
  toggleUserDashboard(true);
}

const handleSignup = () => {
  toggleLoginForm(false);
  toggleSignUpForm(true);
}

const handleCreateAccount = () => {
  toggleUserDashboard(true);
  toggleSignUpForm(false);
}


  return (
    <div>
      {logInForm && <Login handleLogin={handleLogin} handleSignup={handleSignup}/>}
      {userDashboard && <UserDashboard />}
      {signUpForm && <Signup handleLogin={handleLogin} handleCreateAccount={handleCreateAccount}/>}
    </div>
  );
}

export default App;

