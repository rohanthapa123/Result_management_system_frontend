import React from 'react'
import oip from "../../assets/OIP.jpeg"
import { Link } from 'react-router-dom'
import "../component.css"

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li><h3>{`Hello ${localStorage.getItem("name")}`}</h3></li>
                <li><Link to={`profile`} > <img className='profile' src={(localStorage.getItem("image") !== "null") ? `${process.env.REACT_APP_SERVER_URL}/api/images/${localStorage.getItem("image")}` : oip} alt="Your profile here" /></Link></li>
            </ul>
        </nav>
    )
}

export default NavBar