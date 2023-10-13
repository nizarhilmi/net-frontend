import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { format } from 'date-fns';

const UserList = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const roleId = localStorage.getItem("roleId");
  const getUsers = async () => {
    const token = localStorage.getItem('authToken');
    const axiosInstance = axios.create({
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    try {
      const response = await axiosInstance.get("https://localhost:5001/User");
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getExcelReport = async () => {
    const token = localStorage.getItem('authToken');
    const axiosInstance = axios.create({
      headers: {
        'Authorization': `Bearer ${token}`
      },
      responseType: 'blob'
    });

    try {
      const response = await axiosInstance.get("https://localhost:5001/User/report/excel");
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement('a');
      a.href = url;
      const currentDate = new Date();
      const formattedDate = format(currentDate, 'yyyy-MM-dd');
      a.download = `User Report - ${formattedDate}.xlsx`;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  }

  const getPDFReport = async () => {
    const token = localStorage.getItem('authToken');
    const axiosInstance = axios.create({
      headers: {
        'Authorization': `Bearer ${token}`
      },
      responseType: 'blob'
    });

    try {
      const response = await axiosInstance.get("https://localhost:5001/User/report/pdf");
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement('a');
      a.href = url;
      const currentDate = new Date();
      const formattedDate = format(currentDate, 'yyyy-MM-dd');
      a.download = `User Report - ${formattedDate}.pdf`;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteUser = async (id) => {
    const token = localStorage.getItem('authToken');
    const axiosInstance = axios.create({
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    try {
      await axiosInstance.delete(`https://localhost:5001/User/${id}`);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  }

  const handleLogout = () => {
    // Clear the localStorage items you want
    localStorage.removeItem('authToken');
    localStorage.removeItem('roleId');
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <div>
          <Link to={`add`} className="button is-success mr-2">
            Add New
          </Link>
          <Link to={`/`} className="button is-success mr-2" onClick={handleLogout}>
            Log Out
          </Link>
          {roleId === '1' && (
              <button
                  onClick={() => getPDFReport()}
                  className="button is-success mr-2"
              >
                Report PDF
              </button>
          )}
          {roleId === '1' && (
              <button
                  onClick={() => getExcelReport()}
                  className="button is-success"
              >
                Report Excel
              </button>
          )}
        </div>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Username</th>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Birthday</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.dayOfBirthday}</td>
                <button
                    onClick={() => deleteUser(user.id)}
                    className="button is-small is-danger"
                >
                  Delete
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
