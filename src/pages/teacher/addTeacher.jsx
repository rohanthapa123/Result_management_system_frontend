
import React, { useState } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import MultipleSubject from '../../components/MultipleSubject';
import "./teacher.css";
import axiosInstance from '../../services/axiosInstance';
const AddTeacher = () => {
    const navigate = useNavigate();
    const [selectedOptions, setSelectedOptions] = useState();
    const [validationError, setValidationError] = useState({
        fname: '',
        lname: '',
        email: '',
        dob: '',
        primary_contact: '',
        secondary_contact: '',
        permanent_address: '',
        gender: '',

    });
    const [teacherData, setTeacherData] = useState({
        fname: '',
        mname: '',
        lname: '',
        email: '',
        dob: '',
        gender: '',
        primary_contact: '',
        secondary_contact: '',
        temporary_address: '',
        permanent_address: '',
        subjects: [],
        role: 'teacher'

    });
    const regexPatterns = {

        fname: /^[A-Za-z\s'-]+$/,
        lname: /^[A-Za-z\s'-]+$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        primary_contact: /^\d{10}$/,
        secondary_contact: /^(?:\d{10})?$/,

    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        const regexPattern = regexPatterns[name];
        let ifValid = true;

        if (name in regexPatterns) {
            ifValid = regexPattern.test(value);
        }

        setTeacherData(prev => ({ ...prev, [name]: value }));
        setValidationError(prev => ({ ...prev, [name]: ifValid ? '' : `Invalid ${name}` }));
    }

    const handleChangeSubject = (selectedOptions) => {
        setSelectedOptions(selectedOptions);
        //console.log(selectedOptions)
        setTeacherData(prev => ({ ...prev, subjects: selectedOptions }));
    }

    const checkEmptyValue = () => {
        let errors = {};

        if (teacherData.fname.trim() === "") {
            errors.fname = "Enter a first name";
        }
        if (teacherData.lname.trim() === "") {
            errors.lname = "Enter a last name";
        }
        if (teacherData.email.trim() === "") {
            errors.email = "Enter a email";
        }
        if (teacherData.primary_contact.trim() === "") {
            errors.primary_contact = "Enter a primary contact";
        }
        if (teacherData.dob.trim() === "") {
            errors.dob = "Enter a date of birth";
        }
        if (teacherData.permanent_address.trim() === "") {
            errors.permanent_address = "Enter a permanent address";
        }
        if (teacherData.gender.trim() === "") {
            errors.gender = "Enter a gender";
        }

        setValidationError(prev => ({ ...prev, ...errors }));
        return errors;
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = checkEmptyValue()

        const hasErrors = Object.values(errors).some(error => error !== '') || Object.values(validationError).some(error => error !== '');

        if (hasErrors) {
            // alert("Fill form correctly")
            toast.warning("Fill form correctly");
        } else {
            //console.log(teacherData)
            // alert("Form can be submitted")

            axiosInstance.post(`${process.env.REACT_APP_SERVER_URL}/api/register`, teacherData, {
                withCredentials: true,
            }).then(response => {
                //console.log(response.data)
                toast.success("Teacher Added Successfully")
                navigate("/admin/teachers");
            }).catch(error => {
                if (error.response) {
                    //console.log(error.response)
                    // alert(error.response.data.error)
                    toast.error(error.response.data.error)
                }
            })
        }
    }
    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear() - 15;
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <div>
            <div className='backmenu'>
                <h1 className='back'>

                    <Link className='link' to={`/admin/teachers`}> <IoMdArrowRoundBack /></Link>
                </h1>

                <h1 style={{ textAlign: 'center' }}>Add Teacher</h1>
            </div>
            <form onSubmit={handleSubmit} className='student_form' action="" noValidate>
                <div className='input-container'>

                    <label htmlFor="fname">First Name</label>
                    <input onChange={handleChange} type="text" name="fname" placeholder='Enter first name' required />
                    {validationError.fname && (<span>{validationError.fname}</span>)}
                </div>
                <div className='input-container'>

                    <label htmlFor="mname">Middle Name</label>
                    <input onChange={handleChange} type="text" name="mname" placeholder='Enter middle name' />
                </div>
                <div className='input-container'>

                    <label htmlFor="lname">Last Name</label>
                    <input onChange={handleChange} type="text" name="lname" placeholder='Enter last name' required />
                    {validationError.lname && (<span>{validationError.lname}</span>)}
                </div>
                <div className='input-container'>

                    <label htmlFor="email">Email</label>
                    <input required onChange={handleChange} type="text" name="email" placeholder='Enter your email' />
                    {validationError.email && (<span>{validationError.email}</span>)}
                </div>
                <div className='input-container'>

                    <label htmlFor="dob">Dob</label>
                    <input required onChange={handleChange} type="date" name="dob" placeholder='Enter your dob' max={getTodayDate()} />
                    {validationError.dob && (<span>{validationError.dob}</span>)}
                </div>
                <div className='input-container gender'>

                    <label htmlFor="gender">Gender</label>
                    <div className="genderinput">

                        <input required onChange={handleChange} type="radio" name="gender" value={"M"} />Male
                        <input required onChange={handleChange} type="radio" name="gender" value={"F"} />Female
                        <input required onChange={handleChange} type="radio" name="gender" value={"O"} />Other
                    </div>
                    {validationError.gender && (<span>{validationError.gender}</span>)}
                </div>
                <div className='input-container'>

                    <label htmlFor="contacts">Contact One</label>
                    <input required onChange={handleChange} type="number" name="primary_contact" placeholder='Enter primary contact' />
                    {validationError.primary_contact && (<span>{validationError.primary_contact}</span>)}

                </div>
                <div className='input-container'>

                    <label htmlFor="contacts">Contact Two</label>
                    <input required onChange={handleChange} type="number" name="secondary_contact" placeholder='Enter secondary contact' />
                    {validationError.secondary_contact && (<span>{validationError.secondary_contact}</span>)}

                </div>
                <div className='input-container'>

                    <label htmlFor="temporary_address">Temporary Address</label>
                    <input required onChange={handleChange} type="text" name="temporary_address" placeholder='Enter your Secondary Address' />
                </div>
                <div className='input-container'>

                    <label htmlFor="permanent_address">Permanent Address</label>
                    <input required onChange={handleChange} type="text" name="permanent_address" placeholder='Enter your permanent address' />
                    {validationError.permanent_address && (<span>{validationError.permanent_address}</span>)}
                </div>


                <div className='input-container'>

                    <label htmlFor="subject">Subjects</label>
                    {/* <SubjectInput handleChange={handleChange} /> */}
                    <MultipleSubject handleChangeSubject={handleChangeSubject} selectedOptions={selectedOptions} />
                </div>
                <button className='btn'>Submit</button>
            </form>
        </div>
    )
}

export default AddTeacher