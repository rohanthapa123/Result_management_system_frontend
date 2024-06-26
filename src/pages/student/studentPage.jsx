import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import oiep from "../../assets/OIP.jpeg";
import ClassInput from "../../components/ClassInput";
import Search from "../../components/Search/Search";
import SectionInput from "../../components/SectionInput";
import Spinner from "../../components/loader/Spinner";
import axiosInstance from "../../services/axiosInstance";
import { deleteUser, getStudents } from "../../services/fetchFunction";
import "./student.css";

const StudentPage = () => {
  const [students, setStudents] = useState();
  const [_class, setClass] = useState();
  const [selectedStudent, setSelectedStudent] = useState(new Set());
  const [toUpdateClass, setToUpdateClass] = useState();
  const [toUpdateSection, setToUpdateSection] = useState();
  const [toogleUpdateClass, setToogleUpdateClass] = useState(false);
  const [loading, setLoading] = useState(false)

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const getData = useCallback(async (id, search = '') => {
    setLoading(true)
    const data = await getStudents(id, search);
    setStudents(data);
    setLoading(false)
  }, []);

  useEffect(() => {
    getData(_class);
  }, [_class, getData]);

  const debouncedSearchRef = useRef(
    debounce(async (text) => {
      await getData(_class, text);
    }, 500)
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to Delete?")) {
      try {
        await deleteUser(id);
        getData(_class);
      } catch (error) {
        //console.log(error);
      }
    }
  };

  const handleChange = (e) => {
    setClass(e.target.value);
  };

  const handleSearchText = (e) => {
    // setSearchText(e.target.value);
    debouncedSearchRef.current(e.target.value);
  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      const allId = students?.map((student) => student.user_id);
      setSelectedStudent(new Set(allId));
    } else {
      setSelectedStudent(new Set());
    }
  };

  const handleSelectedRow = (id) => {
    setSelectedStudent((previous) => {
      const newSelected = new Set(previous);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };

  const handleToUpdateClass = (e) => {
    setToUpdateClass(e.target.value);
  };

  const handleToUpdateSection = (e) => {
    setToUpdateSection(e.target.value);
  };

  const handleBulkUpdate = async () => {
    try {
      if (window.confirm("Are you sure to update ??")) {
        await axiosInstance.patch(`${process.env.REACT_APP_SERVER_URL}/api/users/bulkactionupdate`, {
          userIds: Array.from(selectedStudent),
          newClass: toUpdateClass,
          newSection: toUpdateSection,
        }, { withCredentials: true });
        toast.warn("All student successfully Updated to new class");
        setSelectedStudent(new Set());
        setToogleUpdateClass(false);
        getData(_class);
      }
    } catch (error) {
      //console.log(error);
      toast.error("Failed to Update");
    }
  };

  const handleBulkDelete = async () => {
    try {
      if (window.confirm("Are you sure to Delete all ??")) {
        await axiosInstance.delete(`${process.env.REACT_APP_SERVER_URL}/api/users/bulkactiondelete`, {
          data: { userIds: Array.from(selectedStudent) },
          withCredentials: true,
        });
        toast.warn("All item successfully Deleted");
        setSelectedStudent(new Set());
        getData(_class);
      }
    } catch (error) {
      //console.log(error);
      toast.error("Failed to Delete");
    }
  };

  return (
    <>
      {toogleUpdateClass && (
        <div className="updateClass">
          <div className="close" onClick={() => setToogleUpdateClass(false)}>
            <IoClose color="black" size={26} />
          </div>
          <h1>Enroll to new class:</h1>
          <ClassInput small={true} handleChange={handleToUpdateClass} />
          <SectionInput small={true} handleChange={handleToUpdateSection} class_id={toUpdateClass} />
          <div>
            <button className="updatebtn" onClick={handleBulkUpdate}>Update</button>
          </div>
        </div>
      )}
      <div className="heading_edit_student heading_edit">
        <h2>Students</h2>
        {selectedStudent.size > 0 && (
          <div className="bulkactiondiv">
            <span className="edit bulkaction" onClick={() => setToogleUpdateClass(!toogleUpdateClass)}>
              <FaEdit size={24} color="white" />
            </span>
            <span className="delete bulkaction" onClick={handleBulkDelete}>
              <MdDelete size={24} color="white" />
            </span>
          </div>
        )}
        <ClassInput small={true} handleChange={handleChange} />
        <Search handleSearchText={handleSearchText} />
        <Link className="link" to={"add"}>
          <button className="add">Add Student</button>
        </Link>
      </div>

      {
        loading ? <Spinner /> : <table className={toogleUpdateClass ? "faded" : ""}>
        <thead className="dashboardtable">
          <tr>
            <th>
              <input
                onChange={handleSelectAll}
                checked={selectedStudent.size === students?.length && students?.length > 0}
                type="checkbox"
                className="selectcheckbox"
              />
            </th>
            <th></th>
            <th>Fname</th>
            <th>Mname</th>
            <th>Lname</th>
            <th>Class</th>
            <th>Roll NO</th>
            <th>Email</th>
            <th className="action">Edit</th>
            <th className="action">Delete</th>
          </tr>
        </thead>
        <tbody>
          {students?.map((student, index) => (
            <tr className={index % 2 === 0 ? "even" : "odd"} key={student.student_id}>
              <td>
                <input
                  checked={selectedStudent.has(student.user_id)}
                  onChange={() => handleSelectedRow(student.user_id)}
                  type="checkbox"
                  className="selectcheckbox"
                />
              </td>
              <td>
                <img
                  src={student.image ? `${student.image}` : oiep}
                  height={50}
                  width={50}
                  alt="profile"
                  className="dpprofile"
                />
              </td>
              <td>{student.fname}</td>
              <td>{student.mname}</td>
              <td>{student.lname}</td>
              <td>{student.class_name}</td>
              <td>{student.roll_no}</td>
              <td>{student.email}</td>
              <td className="action">
                <Link to={`edit/${student.student_id}`}>
                  <FaEdit size={20} color="green" />
                </Link>
              </td>
              <td className="action">
                <button onClick={() => handleDelete(student.user_id)}>
                  <MdDelete size={20} color="red" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      }
    </>
  );
};

export default StudentPage;
