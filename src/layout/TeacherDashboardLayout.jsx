import React from 'react';
import { FaXmarksLines } from 'react-icons/fa6';
import { MdAnnouncement, MdDashboard, MdLogout } from "react-icons/md";
import { PiExam } from "react-icons/pi";
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import NavBar from '../components/DashboardComponent/NavBar';
import "./dashboardLayout.css";
import axiosInstance from '../services/axiosInstance';
const TeacherDashboardLayout = () => {

    const navigate = useNavigate();
    const handleLogout = async () => {
        await axiosInstance.post(`${process.env.REACT_APP_SERVER_URL}/api/logout`, null)
        localStorage.clear();
        navigate("/login");
        // //console.log(resp);
    }
    return (
        <div className='parent'>
            <aside>
                <ul>
                    <li className='headdd'>TD</li>
                    <NavLink className='link' to={"/teacher/dashboard"}>

                        <li className='li'><MdDashboard className='icons' /><span className="sidemenu">Dashboard</span> </li>
                    </NavLink>
                    <NavLink className='link' to={"exam"}>
                        <li className='li'><PiExam className='icons' /> <span className="sidemenu">Exam</span></li>

                    </NavLink>
                    <NavLink className='link' to={"mark"}>
                        <li className='li'><FaXmarksLines className='icons' /> <span className="sidemenu">Marks</span></li>

                    </NavLink>
                    <NavLink className='link' to={"notice"}>
                        <li className='li'><MdAnnouncement className='icons' /> <span className="sidemenu">Notice</span></li>

                    </NavLink>
                </ul>
                <button className='dashboardButton btn' onClick={handleLogout}><MdLogout className='icons' /> <span className="sidemenu">Logout</span></button>
            </aside>
            <div className='content'>
                <NavBar />
                <div className='outlet'>

                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default TeacherDashboardLayout