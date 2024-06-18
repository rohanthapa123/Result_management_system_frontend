import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import oiep from "../../assets/OIP.jpeg";
import ClassInput from "../../components/ClassInput";
import Search from "../../components/Search/Search";
import { deleteUser, getStudents } from "../../services/fetchFunction";
import "./student.css";
import SectionInput from "../../components/SectionInput";
const StudentPage = () => {
  const [students, setStudents] = useState();
  const [_class, setClass] = useState();
  const [searchText, setSearchText] = useState();
  const [selectedStudent, setSelectedStudent] = useState(new Set());
  const [toUpdateClass, setToUpdateClass] = useState()
  const [toUpdateSection, setToUpdateSection] = useState()
  const [toogleUpdateClass, setToogleUpdateClass] = useState(false)
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const getData = async (id) => {
    if (id) {
      const data = await getStudents(id);
      setStudents(data);
    } else {
      if (searchText) {
        const data = await getStudents(null, searchText);
        setStudents(data);
      } else {
        const data = await getStudents();
        // console.log(data)
        setStudents(data);
      }
    }
  };
  useEffect(() => {
    getData(_class);
  }, [_class]);

  const debouncedSearch = useCallback(
    debounce(async (text) => {
      const data = await getStudents(_class, text);
      setStudents(data);
    }, 500),
    [_class]
  );

  const handleDelete = useCallback(async (id) => {
    if (window.confirm("Are you sure to Delete?")) {
      try {
        await deleteUser(id);
        getData();
      } catch (error) {
        console.log(error);
      }
    }
  }, []);
  const handleChange = (e) => {
    setClass(e.target.value);
  };
  const handleSearchText = (e) => {
    setSearchText(e.target.value);
    debouncedSearch(e.target.value);
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
    console.log(e.target.value, " is new class for thosse student");
  }
  const handleToUpdateSection = (e) => {
    setToUpdateSection(e.target.value);
    console.log(e.target.value, " is new section for thosse student");
  }

  const handleBulkUpdate = async () => {
    // console.log(selectedStudent.size)
    // console.log(selectedStudent)
    try {
      if (window.confirm("Are you sure to update ??")) {

        const response = await axios.request({
          url: `${process.env.REACT_APP_SERVER_URL}/api/users/bulkactionupdate`,
          method: 'PATCH',
          data: { userIds: Array.from(selectedStudent), newClass: toUpdateClass, newSection: toUpdateSection },
          withCredentials: true,
        });
        toast.warn("All student successfully Updated to new class")
        setSelectedStudent(new Set())
        setToogleUpdateClass(false);
        getData();
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to Update")
    }
  }
  const handleBulkDelete = async () => {
    // console.log("Bulk delete success")
    // console.log(selectedStudent)
    try {
      if (window.confirm("Are you sure to Delete all ??")) {

        const response = await axios.request({
          url: `${process.env.REACT_APP_SERVER_URL}/api/users/bulkactiondelete`,
          method: 'DELETE',
          data: { userIds: Array.from(selectedStudent) },
          withCredentials: true,
        });
        // console.log(response);
        toast.warn("All item successfully Deleted")
        setSelectedStudent(new Set())
        getData();
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to Delete")
    }
  }
  return (
    <>
      {
        toogleUpdateClass ? <div className="updateClass">
          <div className="close" onClick={() => { setToogleUpdateClass(false) }}> <IoClose color="black" size={26} /> </div>
          <h1>Enroll to new class:</h1>
          <ClassInput small={true} handleChange={handleToUpdateClass} />
          <SectionInput small={true} handleChange={handleToUpdateSection} class_id={toUpdateClass} />
          <div>

            <button className="updatebtn" onClick={handleBulkUpdate}>Update</button>
          </div>
        </div> : null
      }
      <div className="heading_edit">

        <h2>Students</h2>
        {
          selectedStudent.size > 0 ? <div className="bulkactiondiv">
            <span className="edit bulkaction" onClick={() => { setToogleUpdateClass(!toogleUpdateClass) }}> <FaEdit size={24} color="white" /> </span>
            <span className="delete bulkaction" onClick={handleBulkDelete}> <MdDelete size={24} color="white" /></span>

          </div> : null
        }

        <ClassInput small={true} handleChange={handleChange} />

        <Search handleSearchText={handleSearchText} />
        <Link className="link" to={"add"}>
          <button className="add">Add Student</button>
        </Link>
      </div>

      <table className={toogleUpdateClass ? "faded" : ""}>
        <thead>
          <tr>
            <th>
              <input
                onChange={handleSelectAll}
                checked={
                  selectedStudent.size === students?.length &&
                  students?.length > 0
                }
                type="checkbox"
                name="selectall"
                id=""
                className="selectcheckbox"
              />
            </th>
            <th></th>
            <th>Fname</th>
            <th>Mname</th>
            <th>Lname</th>
            <th>Class</th>
            <th>Email</th>
            <th className="action">Edit</th>
            <th className="action">Delete</th>
          </tr>
        </thead>
        <tbody>
          {students?.map((student, index) => {
            return (
              <tr
                className={index % 2 == 0 ? "even" : "odd"}
                key={student.student_id}
              >
                <td>
                  <input
                    checked={selectedStudent.has(student.user_id)}
                    onChange={() => handleSelectedRow(student.user_id)}
                    type="checkbox"
                    name="select"
                    id=""
                    className="selectcheckbox"
                  />
                </td>
                <td>
                  <img
                    src={
                      student.image
                        ? `${process.env.REACT_APP_SERVER_URL}/api/images/${student.image}`
                        : oiep
                    }
                    height={50}
                    width={50}
                    alt="profile"
                  />
                </td>
                <td>{student.fname}</td>
                <td>{student.mname}</td>
                <td>{student.lname}</td>
                <td>{student.class_name}</td>
                <td>{student.email}</td>
                <td className="action">
                  <Link to={`edit/${student.student_id}`}>
                    <FaEdit size={20} color="green" />
                  </Link>
                </td>
                <td className="action">
                  <button onClick={(e) => handleDelete(student.user_id)}>
                    <MdDelete size={20} color="red" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default StudentPage;
