import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../../components/loader/Spinner";
import axiosInstance from "../../services/axiosInstance";
import "./dashboard.css";
const Dashboard = () => {
    const [roleCount, setRoleCount] = useState();
    const [loading, setLoading] = useState(false)
    const [resetEmail, setResetEmail] = useState();
    useEffect(() => {
        const fetchRoleCount = async () => {
            setLoading(true)
            await axiosInstance.get(`${process.env.REACT_APP_SERVER_URL}/api/users/count`).then((response) => {
                // //console.log
                setRoleCount(response.data.data);
            }).catch((error) => {
                //console.log(error)
            })
            setLoading(false)
        }
        fetchRoleCount();
    }, [])
    const resetsEmail = async (e) => {
        e.preventDefault();
        if (window.confirm(`Are you sure to reset password for ${resetEmail}`)) {
            // //console.log(resetEmail)
            try {
                await axiosInstance.post(`${process.env.REACT_APP_SERVER_URL}/api/resetpassword`, {
                    email: resetEmail
                })
                toast.success("Password Reset Successfully");
                setResetEmail("")
            } catch (error) {
                //console.log(error)
            }
        }
        // //console.log()
    }
    return (
        <>
            {
                loading ? <Spinner /> : <>
                    <div className="countContainer">
                        {
                            roleCount?.map((role , index) => {
                                return <div key={index} className="count">
                                    <h3>No of {role.role}</h3>
                                    <h1>{role.no_of_user}</h1>
                                </div>
                            })
                        }


                    </div>
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
            }
        </>
    )
}

export default Dashboard