import React, { useCallback, useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteClass, getClass } from '../../services/fetchFunction';
import "./class.css";
import Spinner from '../../components/loader/Spinner';
const ClassPage = () => {
  const [classes, setClasses] = useState();
  const [loading, setLoading] = useState(false)

  const getData = async () => {
    setLoading(true)
    const data = await getClass();
    setClasses(data)
    // //console.log(data)
    setLoading(false)
  }
  useEffect(() => {
    getData();
  }, [])
  const handleDelete = useCallback(async (id) => {
    try {
      if (window.confirm("Are you sure to delete")) {
        await deleteClass(id);

        toast.warning("Class Deleted");
        getData();
      }
    } catch (error) {
      //console.log(error)
    }
  }, []);
  return (
    <>
      <div className='heading_edit'>

        <h2>Class</h2>
        <Link className="link" to={"add"}><button className="add">Create Class </button></Link>
      </div>
      {
        loading ? <Spinner /> : <table className='dashboardtable' >
          <thead>
            <tr>
              <th>Class Name</th>
              <th>Desc</th>
              <th>Academic Year</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              classes?.map((_class, index) => {
                return <tr key={_class.class_id} className={index % 2 === 0 ? "even" : "odd"}>
                  <td>{_class.class_name}</td>
                  <td>{_class.desc}</td>
                  <td>{_class.academic_year}</td>
                  <td className='action'><Link to={`edit/${_class.class_id}`}><FaEdit size={20} color="green" /></Link></td>
                  <td className='action'><button onClick={(e) => handleDelete(_class.class_id)}><MdDelete size={20} color="red" /></button></td>
                </tr>
              })
            }
          </tbody>
        </table>
      }
    </>
  )
}

export default ClassPage