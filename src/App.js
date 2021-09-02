import Login from "./components/login/Login";
import Signup from "./components/login/Signup";
import UserDashboard from "./components/userDashboard/UserDashboard";
import React, {useState} from "react";
import Modal from "./components/common/Modal";

export const API = "http://206.189.91.54";

function App() {
  const [isOpenLoginPage, setIsOpenLoginPage] = useState(true);
  const [isOpenSignUpPage, setIsOpenSignUpPage] = useState(false);
  const [isOpenUserDashboard, setIsOpenUserDashboard] = useState(false);
  const [loginHeaders, setLoginHeaders] = useState({});
  const [isOpenModal, setIsOpenModal] = useState(true);

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
      {isOpenUserDashboard && <UserDashboard
        loginHeaders={loginHeaders}
      />}
      {isOpenSignUpPage && <Signup
        openPage={openPage}
        setLoginHeaders={setLoginHeaders}
      />}

      {/* MODAL EXAMPLE */}
      {/* {isOpenModal && <Modal
        setIsOpenModal={setIsOpenModal}
        // closeModalFunction={() => {console.log("modal closed")}}
      >
        <div className="
        py-4 px-6
        border-gray-150 border-2 rounded-lg
        transition duration-200
        flex flex-col justify-center
        bg-white
        w-96
        ">
          <p>mikyle</p>
          <p>ivan</p>
          <p>leandre</p>
        </div>
      </Modal>} */}

    </div>
    <p>
      {JSON.stringify(loginHeaders)}
    </p>
  </>
};

export default App;