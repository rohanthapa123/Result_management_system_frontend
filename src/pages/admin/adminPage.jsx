import React, { useCallback, useEffect, useState } from 'react'
import "./admin.css"
import oip from "../../assets/OIP.jpeg"
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { deleteUser, getAdmins } from '../../services/fetchFunction'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
const AdminPage
  = () => {
    const [admins, setAdmins] = useState();
    const getData = async () => {
      const data = await getAdmins();
      console.log(data)
      setAdmins(data)
    }
    useEffect(() => {
      getData();
      // console.log(admins)
    }, [])
    const handleDelete = useCallback(async (id) => {
      if (window.confirm("Are you sure to Delete?")) {
        try {
          await deleteUser(id);
          toast.warn("Admin deleted successfully");
          getData();
        } catch (error) {
          console.log(error)
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
        <table >
          <thead>
            <tr>
              <th></th>
              <th>Fname</th>
              <th>Mname</th>
              <th>Lname</th>
              <th>Email</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              admins?.map((admin, index) => {
                return <tr className={index % 2 === 0 ? "even" : "odd"} key={admin.admin_id}>
                  <td><img src={admin.image ? `${process.env.REACT_APP_SERVER_URL}/api/images/${admin.image}` : oip} height={50} width={50} alt="profile" /></td>
                  <td>{admin.fname}</td>
                  <td>{admin.mname}</td>
                  <td>{admin.lname}</td>
                  <td>{admin.email}</td>
                  <td className='action'><Link to={`edit/${admin.admin_id}`}><FaEdit size={20} color="green" /></Link></td>
                  <td className='action'><button onClick={(e) => handleDelete(admin.user_id)}><MdDelete size={20} color="red" /></button></td>
                </tr>
              })
            }
          </tbody>
        </table>
      </>
    )
  }

export default AdminPage
