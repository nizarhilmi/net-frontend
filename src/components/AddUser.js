import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");
  const [dayOfBirthday, setDayOfBirthday] = useState("");
  const [roleId, setRoleId] = useState("2");



  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem('authToken');
      const axiosInstance = axios.create({
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      await axiosInstance.post("https://localhost:5001/User", {
        username,
        password,
        name,
        email,
        gender,
        dayOfBirthday,
        roleId
      });

      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };


  const handleDateChange = (date) => {
    setDayOfBirthday(date);
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={saveUser}>
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Name"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                  type="password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                  type="text"
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Gender</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="Man">Man</option>
                  <option value="Woman">Woman</option>
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label">Date of Birth</label>
            <div className="control">
              <DatePicker
                  selected={dayOfBirthday}
                  onChange={handleDateChange}
                  placeholderText="Select a date"
                  dateFormat="yyyy-MM-dd"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Role</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                    value={roleId}
                    onChange={(e) => setRoleId(e.target.value)}
                >
                  <option value="2">Operator</option>
                  <option value="1">Admin</option>
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <button type="submit" className="button is-success">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
