import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://localhost:5001/Auth", {
                username,
                password,
            });
            console.log(response);
            // Save the token to local storage
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('roleId', response.data.roleId);

            navigate("/home");
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <form onSubmit={loginUser}>
                    <div className="field">
                        <label className="label">Username</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
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
                        <button type="submit" className="button is-success">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
