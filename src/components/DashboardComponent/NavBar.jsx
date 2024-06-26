import React from 'react'
import { Link } from 'react-router-dom'
import oip from "../../assets/OIP.jpeg"
import "../component.css"

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li><h3>{`Hello ${localStorage.getItem("name")}`}</h3></li>
                <li><Link to={`profile`} > <img className='profile' src={(localStorage.getItem("image") !== "null") ? `${localStorage.getItem("image")}` : oip} alt="Your profile here" height={50} width={50} /></Link></li>
            </ul>
        </nav>
    )
}

export default NavBar