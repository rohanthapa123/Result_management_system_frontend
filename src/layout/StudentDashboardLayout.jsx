import React from 'react';
import { MdAnnouncement, MdDashboard, MdLogout, MdReportProblem } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import NavBar from '../components/DashboardComponent/NavBar';
import "./dashboardLayout.css";
import axiosInstance from '../services/axiosInstance';
const StudentDashboardLayout = () => {

    const navigate = useNavigate();
    const handleLogout = async () => {
        await axiosInstance.post(`${process.env.REACT_APP_SERVER_URL}/api/logout`, null, {
            withCredentials: true,
        })
        localStorage.clear()
        navigate("/login");
        // //console.log(resp);
    }
    return (
        <div className='parent'>
            <aside>
                <ul>
                    <li className='headdd'>STD</li>
                    <NavLink className='link' to={"/student/dashboard"}>

                        <li className='li'><MdDashboard className='icons' /><span className="sidemenu">Dashboard</span> </li>
                    </NavLink>
                    <NavLink className='link' to={"result"}>

                        <li className='li'><PiStudent className='icons' /> <span className="sidemenu">Result</span></li>
                    </NavLink>
                    <NavLink className='link' to={"notice"}>
                        <li className='li'><MdAnnouncement className='icons' /> <span className="sidemenu">Notice</span></li>

                    </NavLink>
                    <NavLink className='link' to={"complains"}>
                        <li className='li'><MdReportProblem className='icons' /> <span className="sidemenu">Complains</span></li>

                    </NavLink>
                </ul>
                <button className='dashboardButton btn' onClick={handleLogout}><MdLogout className='icons' /> <span className="sidemenu">Logout</span></button>
            </aside>
            <div className='content'>
                <div className="navbar">
                    <NavBar />
                </div>
                <div className='outlet'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default StudentDashboardLayout