import { useEffect } from "react"
import "./dashboard.css"
import { useState } from "react"
import axios from "axios";
import { toast } from "react-toastify";
const Dashboard = () => {
    const [roleCount, setRoleCount] = useState();
    const [resetEmail, setResetEmail] = useState();
    useEffect(() => {
        const fetchRoleCount = async () => {
            await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/count`, {
                withCredentials: true,
            }).then((response) => {
                // console.log
                setRoleCount(response.data.data);
            }).catch((error) => {
                console.log(error)
            })
        }
        fetchRoleCount();
    }, [])
    const resetsEmail = async (e) => {
        e.preventDefault();
        if (window.confirm(`Are you sure to reset password for ${resetEmail}`)) {
            // console.log(resetEmail)
            try {
                await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/resetpassword`, {
                    email: resetEmail
                }, {
                    withCredentials: true,
                })
                toast.success("Password Reset Successfully");
                setResetEmail("")
            } catch (error) {
                console.log(error)
            }
        }
        // console.log()
    }
    return (
        <>
            <div className="countContainer">
                {
                    roleCount?.map((role) => {
                        return <div className="count">
                            <h3>No of {role.role}</h3>
                            <h1>{role.no_of_user}</h1>
                        </div>
                    })
                }


            </div>
            <h1 className="resettitle">Graph for student perfomance in exam overall coming soon ...</h1>
            <div className="resetpassword">
                <h1 className="resettitle">Enter email to reset password</h1>
                <div className="innerresetpassword">
                    <form className="resetform" onSubmit={resetsEmail}>

                        <input className="resetemail" onChange={(e) => setResetEmail(e.target.value)} value={resetEmail} type="email" name="email" placeholder="Enter email here.." id="" />
                        <button className="resetBtn">Submit</button>
                    </form>
                </div>

            </div>
        </>
    )
}

export default Dashboard