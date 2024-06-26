import React, { useCallback, useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import oip from "../../assets/OIP.jpeg"
import Spinner from '../../components/loader/Spinner'
import { deleteUser, getAdmins } from '../../services/fetchFunction'
import "./admin.css"
const AdminPage = () => {
  const [admins, setAdmins] = useState();
  // const [peekData, setPeekData] = useState();
  const [loading, setLoading] = useState(false)
  const getData = async () => {
    setLoading(true)
    const data = await getAdmins();
    //console.log(data)
    setAdmins(data)
    setLoading(false)
  }
  useEffect(() => {
    getData();
    // //console.log(admins)
  }, [])

  // const handlePeek = (user_id) => {
  //   const userData = admins.filter((item) => item.user_id === user_id)
  //   setPeekData(userData[0])
  //   console.log(userData[0])
  // }
  const handleDelete = useCallback(async (id) => {
    if (window.confirm("Are you sure to Delete?")) {
      try {
        await deleteUser(id);
        toast.warn("Admin deleted successfully");
        getData();
      } catch (error) {
        //console.log(error)
      }
    }
  }, []);
  return (
    <>

      <div className='heading_edit'>
        <div>

          <h2>Admins</h2>
          <p><i>(NOTE: Admins are like god so add them carefully)</i></p>
        </div>
        <Link className="link" to={"add"}><button className="add">Add Admin</button></Link>
      </div>
      {
        loading ? <Spinner /> : <table className='dashboardtable' >
          <thead>
            <tr>
              <th></th>
              <th>Fname</th>
              <th>Mname</th>
              <th>Lname</th>
              <th>Email</th>
              {/* <th>Peek</th> */}
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              admins?.map((admin, index) => {
                return <tr className={index % 2 === 0 ? "even" : "odd"} key={admin.admin_id}>
                  <td><img className='dpprofile' src={admin.image ? `${admin.image}` : oip} height={50} width={50} alt="profile" /></td>
                  <td>{admin.fname}</td>
                  <td>{admin.mname}</td>
                  <td>{admin.lname}</td>
                  <td>{admin.email}</td>
                  {/* <td className='peektd'>
                    <button className='peekbutton' onClick={(e) => handlePeek(admin.user_id)}> <FaEye size={20} color='white' /></button>
                    {
                      peekData ? <div className="peekcontainer">
                        <div className="name">

                          {peekData.fname} {peekData.mname} {peekData.lname}
                        </div>
                        <div className="dob">

                          {peekData.dob}
                        </div>
                        <div className="email">

                          {peekData.email}
                        </div>
                        

                      </div> : ""
                    }
                  </td> */}
                  <td className='action'><Link to={`edit/${admin.admin_id}`}><FaEdit size={20} color="green" /></Link></td>
                  <td className='action'><button onClick={(e) => handleDelete(admin.user_id)}><MdDelete size={20} color="red" /></button></td>
                </tr>
              })
            }
          </tbody>
        </table>
      }
    </>
  )
}

export default AdminPage
