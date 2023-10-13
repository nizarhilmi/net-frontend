import {BrowserRouter, Routes, Route} from "react-router-dom";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";
import Login from "./components/Login";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<UserList/>}/>
        <Route path="/home/add" element={<AddUser/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
