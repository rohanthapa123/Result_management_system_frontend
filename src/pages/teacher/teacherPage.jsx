import React, { useCallback, useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import oip from "../../assets/OIP.jpeg"
import { deleteUser, getTeachers } from '../../services/fetchFunction'
import "./teacher.css"
import Spinner from '../../components/loader/Spinner'
const TeacherPage = () => {
  const [teachers, setTeacher] = useState();
  const [loading , setLoading] = useState(false)
  const getData = async () => {
    setLoading(true)
    const data = await getTeachers();
    console.log(data)
    setTeacher(data)
    setLoading(false)
  }
  useEffect(() => {
    getData();
    // console.log(teachers)
  }, [])
  const handleDelete = useCallback(async (id) => {
    if (window.confirm("Are you sure to Delete?")) {
      try {
        await deleteUser(id);
        toast.warning("Teacher deleted successfully")
        getData();
      } catch (error) {
        console.log(error)
      }
    }
  }, []);
  return (
    <>
      <div className='heading_edit'>
        <h2>Teacher</h2>
        <Link className="link" to={"add"}><button className="add">Add Teacher</button></Link>
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
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            teachers?.map((teacher, index) => {
              return <tr className={index % 2 === 0 ? "even" : "odd"} key={teacher.teacher_id}>
                <td><img className='dpprofile' src={teacher.image ? `${teacher.image}` : oip} height={50} width={50} alt="profile" /></td>
                <td>{teacher.fname}</td>
                <td>{teacher.mname}</td>
                <td>{teacher.lname}</td>
                <td>{teacher.email}</td>
                <td className='action'><Link to={`edit/${teacher.teacher_id}`}><FaEdit size={20} color="green" /></Link></td>
                <td className='action'><button onClick={(e) => handleDelete(teacher.user_id)}><MdDelete size={20} color="red" /></button></td>
              </tr>
            })
          }
        </tbody>
      </table>
      }
    </>
  )
}

export default TeacherPage