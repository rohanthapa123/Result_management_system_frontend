import React, { useCallback, useEffect, useState } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../../services/axiosInstance';
import { getClass, getSectionByClass } from '../../services/fetchFunction';
import "./student.css";

const AddStudent = () => {
    const navigate = useNavigate();
    const [classes, setClasses] = useState([]);
    const [section, setSection] = useState([]);
    const [validationError, setValidationError] = useState({
        fname: '',
        lname: '',
        email: '',
        dob: '',
        primary_contact: '',
        secondary_contact: '',
        permanent_address: '',
        gender: '',
        class_id: '',
        section_id: '',
        blood_group: '',
        nationality: '',
    });
    const [studentData, setStudentData] = useState({
        fname: '',
        mname: '',
        lname: '',
        email: '',
        dob: '',
        primary_contact: '',
        secondary_contact: '',
        temporary_address: '',
        permanent_address: '',
        class_id: '',
        section_id: '',
        roll_no: '',
        blood_group: '',
        nationality: '',
        role: 'student',
        gender: '',
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

        setStudentData(prev => ({ ...prev, [name]: value }));
        setValidationError(prev => ({ ...prev, [name]: ifValid ? '' : `Invalid ${name}` }));
        // console.log(studentData)
    };

    const checkEmptyValue = () => {
        let errors = {};

        if (studentData.fname.trim() === "") {
            errors.fname = "Enter a first name";
        }
        if (studentData.lname.trim() === "") {
            errors.lname = "Enter a last name";
        }
        if (studentData.email.trim() === "") {
            errors.email = "Enter a email";
        }
        if (studentData.primary_contact.trim() === "") {
            errors.primary_contact = "Enter a primary contact";
        }
        if (studentData.dob.trim() === "") {
            errors.dob = "Enter a date of birth";
        }
        if (studentData.permanent_address.trim() === "") {
            errors.permanent_address = "Enter a permanent address";
        }
        if (studentData.class_id.trim() === "") {
            errors.class_id = "Enter a class ID";
        }
        if (studentData.section_id.trim() === "") {
            errors.section_id = "Enter a section ID";
        }
        if (studentData.gender.trim() === "") {
            errors.gender = "Enter a gender";
        }
        if (studentData.blood_group.trim() === "") {
            errors.blood_group = "Enter a blood group";
        }
        if (studentData.nationality.trim() === "") {
            errors.nationality = "Enter a nationality";
        }

        setValidationError(prev => ({ ...prev, ...errors }));
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = checkEmptyValue();
        const hasErrors = Object.values(errors).some(error => error !== '') || Object.values(validationError).some(error => error !== '');

        if (hasErrors) {
            toast.warning("Fill form correctly");
        } else {
            axiosInstance.post(`${process.env.REACT_APP_SERVER_URL}/api/register`, studentData, { withCredentials: true })
                .then(response => {
                    toast.success("Student Added Successfully");
                    navigate("/admin/students");
                }).catch(error => {
                    if (error.response) {
                        toast.error(error.response.data.error);
                    }
                });
        }
    };

    const getClassData = async () => {
        const classData = await getClass();
        setClasses(classData);
    };

    const getSectionData = async (class_id) => {
        if (class_id) {
            const sectionData = await getSectionByClass(class_id);
            setSection(sectionData);
        }
    };

    const getNextRollNo = useCallback(async () => {
        try {
            if (studentData.class_id) {
                const resp = await axiosInstance.get(`${process.env.REACT_APP_SERVER_URL}/api/getnextrollno/${studentData.class_id}`);
                // console.log(resp.data.data)
                const newroll = resp.data.data;
                setStudentData((prev) => ({ ...prev, roll_no: newroll.toString() }))
            }
        } catch (error) {
            toast.error(error.response.data.message)
            // console.log(error)
        }
    },[studentData.class_id])

    useEffect(() => {
        getClassData();
    }, []);

    useEffect(() => {
        getSectionData(studentData.class_id);
    }, [studentData.class_id]);

    useEffect(() => {
        getNextRollNo();
    }, [getNextRollNo])

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear() - 5;
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <div className='main_container'>
            <div className='backmenu'>
                <h1 className='back'>
                    <Link className='link' to={`/admin/students`}><IoMdArrowRoundBack /></Link>
                </h1>
                <h1 style={{ textAlign: 'center' }}>Add Student</h1>
            </div>

            <form onSubmit={handleSubmit} className='student_form' noValidate>
                <div className='input-container'>
                    <label htmlFor="fname">First Name</label>
                    <input onChange={handleChange} type="text" id='fname' name="fname" required />
                    {validationError.fname && (<span>{validationError.fname}</span>)}
                </div>
                <div className='input-container'>
                    <label htmlFor="mname">Middle Name</label>
                    <input onChange={handleChange} id='mname' type="text" name="mname" />
                </div>
                <div className='input-container'>
                    <label htmlFor="lname">Last Name</label>
                    <input onChange={handleChange} id='lname' type="text" name="lname" required />
                    {validationError.lname && (<span>{validationError.lname}</span>)}
                </div>
                <div className='input-container'>
                    <label htmlFor="email">Email</label>
                    <input onChange={handleChange} id='email' type="text" name="email" required />
                    {validationError.email && (<span>{validationError.email}</span>)}
                </div>
                <div className='input-container'>
                    <label htmlFor="dob">DOB</label>
                    <input onChange={handleChange} id='dob' type="date" name="dob" max={getTodayDate()} required />
                    {validationError.dob && (<span>{validationError.dob}</span>)}
                </div>
                <div className='input-container'>
                    <label htmlFor="primary_contact">Primary Contact</label>
                    <input onChange={handleChange} id='primary_contact' type="text" name="primary_contact" required />
                    {validationError.primary_contact && (<span>{validationError.primary_contact}</span>)}
                </div>
                <div className='input-container'>
                    <label htmlFor="secondary_contact">Secondary Contact</label>
                    <input onChange={handleChange} id='secondary_contact' type="text" name="secondary_contact" />
                    {validationError.secondary_contact && (<span>{validationError.secondary_contact}</span>)}
                </div>
                <div className='input-container'>
                    <label htmlFor="temporary_address">Temporary Address</label>
                    <input onChange={handleChange} id='temporary_address' type="text" name="temporary_address" required />
                </div>
                <div className='input-container'>
                    <label htmlFor="permanent_address">Permanent Address</label>
                    <input onChange={handleChange} id='permanent_address' type="text" name="permanent_address" required />
                    {validationError.permanent_address && (<span>{validationError.permanent_address}</span>)}
                </div>
                <div className='input-container gender'>
                    <label htmlFor="gender">Gender</label>
                    <div className='genderinput'>
                        <input onChange={handleChange} type="radio" name="gender" value="M" required /> Male
                        <input onChange={handleChange} type="radio" name="gender" value="F" required /> Female
                        <input onChange={handleChange} type="radio" name="gender" value="O" required /> Other
                    </div>
                    {validationError.gender && (<span>{validationError.gender}</span>)}
                </div>
                <div className='input-container'>
                    <label htmlFor="class_id">Class</label>
                    <select onChange={handleChange} name="class_id" required>
                        <option value="">Select Class</option>
                        {classes.map(_class => (
                            <option key={_class.class_id} value={_class.class_id}>{_class.class_name}</option>
                        ))}
                    </select>
                    {validationError.class_id && (<span>{validationError.class_id}</span>)}
                </div>
                <div className='input-container'>
                    <label htmlFor="section_id">Section</label>
                    <select onChange={handleChange} name="section_id" required>
                        <option value="">Select Section</option>
                        {section.map(sec => (
                            <option key={sec.section_id} value={sec.section_id}>{sec.section_name}</option>
                        ))}
                    </select>
                    {validationError.section_id && (<span>{validationError.section_id}</span>)}
                </div>
                <div className='input-container'>
                    <label htmlFor="roll_no">Roll No</label>
                    <input required placeholder='select class to generate roll no' onChange={handleChange} value={studentData?.roll_no} id='roll_no' type="number" name="roll_no" disabled />
                </div>
                <div className='input-container'>

                    <label htmlFor="blood_group">Blood Group</label>
                    <select required className='selectBox' onChange={handleChange} name="blood_group" id="">
                        <option value="">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="B+">B+</option>
                        <option value="A-">A-</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>
                    {validationError.blood_group && (<span>{validationError.blood_group}</span>)}
                </div>
                <div className='input-container'>
                    <label htmlFor="nationality">Nationality</label>
                    <select required className='selectBox' onChange={handleChange} name="nationality" id="">
                        <option value="">Select Nationality</option>
                        <option value="nepali">Nepali</option>
                        <option value="indian">Indian</option>
                        <option value="american">American</option>
                        <option value="australian">Australian</option>
                        <option value="japanese">Japanese</option>
                    </select>
                    {validationError.nationality && (<span>{validationError.nationality}</span>)}
                </div>
                <button className='btn'>Submit</button>
            </form>
        </div>
    )
}

export default AddStudent