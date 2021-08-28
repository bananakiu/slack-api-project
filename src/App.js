import Login from "./Components/Login/Login";
import axios from 'axios';
import { useEffect } from 'react';

export const API = "206.189.91.54";

function App() {
  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
