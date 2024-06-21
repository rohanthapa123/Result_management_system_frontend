import axios from "axios";
import "./loginPage.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";
const LoginPage = () => {
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [loggedIn, setLoggedIn] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }))
        // //console.log(values)
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true)
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/login`, values,{
                withCredentials: true
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if (response.status === 200) {
                const data = response.data;
                //console.log(data)
                setLoggedIn(true);
                const { authToken, userData } = data;
                // setIsAuthenticated(true);
                // setRole(userRole)
                localStorage.setItem("name", userData?.fname);
                localStorage.setItem("image", userData?.image)
                localStorage.setItem("accessToken", authToken);
                localStorage.setItem("userData", JSON.stringify(userData));

                navigate(`/${userData.role}/dashboard`)
                // window.location.href = `/${data.data[0].role}`;
            } else {
                //console.log("Login Failed");
            }
            setLoading(false)
        } catch (error) {
            setLoading(false);
            setEmailError("");
            setPasswordError("")
            if (error.response.data.message) {
                if (error.response.data.message === 'Wrong Credentials') {
                    setEmailError(error.response.data.message)
                } else {
                    setPasswordError(error.response.data.message)
                }
            }
            //console.log(error);
        }
    }
    // const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const accessToken = localStorage.getItem("accessToken");
                if (accessToken) {
                    await axiosInstance.get(`${process.env.REACT_APP_SERVER_URL}/api/check-auth`);
                    const userData = JSON.parse(localStorage.getItem("userData"));
                    navigate(`/${userData.role}/dashboard`);
                }
            } catch (error) {

                console.error("Error checking authentication status", error);
            } 
        };
        checkAuthStatus();

        // eslint-disable-next-line
    }, [])
    return (
        <>
            <div className={`container ${loggedIn ? 'slide-up' : ''}`}>

                <div className="form">
                    <h1>User Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-container">

                            <label htmlFor="email">Email</label>
                            <input className="loginInput" type="email" name="email" onChange={handleInput} placeholder="Enter your email" />
                            <span>{emailError}</span>
                        </div>
                        <div className="input-container">

                            <label htmlFor="password">Password</label>
                            <input className="loginInput" type="password" name="password" onChange={handleInput} placeholder="Enter your password" />
                            <span>{passwordError}</span>
                        </div>
                        {
                            loading ? <button className="loginBtn"><div className="loadingsubmit" /></button> : <button className="loginBtn">Submit</button>
                        }
                    </form>
                    <p className="reset"><i>Contact College Admin to reset password</i> </p>
                </div >
            </div >
        </>
    )
}

export default LoginPage