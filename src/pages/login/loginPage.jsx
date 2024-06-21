import "./loginPage.css";

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
        // console.log(values)
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true)
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/login`, values, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            })
            if (response.status === 200) {
                const data = response.data;
                setLoggedIn(true);
                // console.log(data.data[0].role);
                const userRole = data.data[0].role;
                // setIsAuthenticated(true);
                // setRole(userRole)
                localStorage.setItem("name", data?.data[0]?.fname);
                localStorage.setItem("image", data?.data[0]?.image)

                navigate(`/${userRole}/dashboard`)
                // window.location.href = `/${data.data[0].role}`;
            } else {
                console.log("Login Failed");
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
            console.log(error);
        }
    }
    // const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/check-auth`, { withCredentials: true });

                if (response.data.authenticated) {
                    navigate(`/${response.data.role}/dashboard`);
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