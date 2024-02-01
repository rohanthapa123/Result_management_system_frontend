import React, { useEffect, useState } from 'react';
import oip from "../assets/OIP.jpeg"
import "./dashboardLayout.css"
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { PiExam, PiStudent } from "react-icons/pi"
import { GiTeacher } from "react-icons/gi";
import { SiBookstack } from "react-icons/si";
import { FaSearch } from "react-icons/fa";
import { MdAnnouncement, MdDashboard, MdFlightClass, MdLogout, MdReportProblem } from "react-icons/md";
import axios from 'axios';
const DashboardLayout = (user) => {
    const [userData, setUserData] = useState(user.user);
    const navigate = useNavigate();
    const handleLogout = async () => {
        await axios.post("http://localhost:8080/api/logout", null, {
            withCredentials: true,
        })
        navigate("/login");
        // console.log(resp);
    }
    return (
        <div className='parent'>
            <aside>
                <ul>
                    <li><h1 className='headdd'>Admin Dashboard</h1></li>
                    <Link className='link' to={"/admin"}>

                        <li className='li'><MdDashboard />Dashboard </li>
                    </Link>
                    <Link className='link' to={"students"}>

                        <li className='li'><PiStudent /> Student</li>
                    </Link>
                    <Link className='link' to={"teachers"}>
                        <li className='li'><GiTeacher /> Teacher</li>

                    </Link>
                    <Link className='link' to={"exam"}>
                        <li className='li'><PiExam /> Exam</li>

                    </Link>
                    <Link className='link' to={"class"}>
                        <li className='li'><MdFlightClass /> Class</li>

                    </Link>
                    <Link className='link' to={"subject"}>
                        <li className='li'><SiBookstack /> Subject</li>

                    </Link>
                    <Link className='link' to={"notice"}>
                        <li className='li'><MdAnnouncement /> Notice</li>

                    </Link>
                    <Link className='link' to={"complains"}>
                        <li className='li'><MdReportProblem /> Complains</li>

                    </Link>
                </ul>
                <button className='dashboardButton' onClick={handleLogout}><MdLogout /> Logout</button>
            </aside>
            <div className='content'>
                <nav>
                    <ul>
                        <li><h3>{`Hello ${userData?.fname}`}</h3></li>
                        <li><Link to={"profile"}> <img className='profile' src={userData?.image ? userData.image : oip} alt="Your image here" /></Link></li>
                    </ul>
                </nav>
                <div className='outlet'>

                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout