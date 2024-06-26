
import React, { useState } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "./subject.css";
import axiosInstance from '../../services/axiosInstance';
const AddSubject = () => {
    const navigate = useNavigate();

    const [subjectData, setSubjectData] = useState({
        subject_name: '',
        subject_code: '',
        desc: ''

    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSubjectData(prev => ({ ...prev, [name]: value }));
        //console.log(subjectData)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const isEmptyField = Object.values(subjectData).some(value => value.trim() === '');

        if (isEmptyField) {
            alert('Please fill in all fields');
            return;
        }
        //console.log(subjectData)
            // alert("Form can be submitted")

            axiosInstance.post(`${process.env.REACT_APP_SERVER_URL}/api/subject`, subjectData, {
            withCredentials: true,
        }).then(response => {
            // //console.log(response.data)
            if (response.status === 200) {
                toast.success("Subject Added Successfully")
                navigate("/admin/subject");
            }
        }).catch(error => {
            if (error.response) {
                //console.log(error.response)
                toast.error(error.response.data.error);
                // alert(error.response.data.error)
            }
        })

    }
return (
    <div>
        <div className='backmenu'>
            <h1 className='back'>

                <Link className='link' to={`/admin/subject`}> <IoMdArrowRoundBack /></Link>
            </h1>

            <h1 style={{ textAlign: 'center' }}>Add Subject</h1>
        </div>
        <form onSubmit={handleSubmit} className='student_form' action="">
            <div className='input-container'>

                <label htmlFor="sub_name">Subject Name</label>
                <input onChange={handleChange} type="text" id='sub_name' name="subject_name" placeholder='Enter Subject Name' required />
            </div>
            <div className='input-container'>

                <label htmlFor="sCode">Subject Code</label>
                <input onChange={handleChange} id='sCode' type="text" name="subject_code" placeholder='Enter subject code' />
            </div>
            <div className='input-container'>

                <label htmlFor="disc">Description</label>
                <input onChange={handleChange} id='disc' type="text" name="desc" placeholder='Enter Description' />
            </div>
            <button className='btn'>Submit</button>
        </form>
    </div>
)
}

export default AddSubject