import React, { useCallback, useEffect, useState } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ClassInput from '../../components/ClassInput';
import axiosInstance from '../../services/axiosInstance';
import { getSectionByClass, getStudentById } from '../../services/fetchFunction';
import "./student.css";
const EditStudent = () => {
    const navigate = useNavigate();
    // const [classes, setClasses] = useState();
    const { id } = useParams();
    const [section, setSection] = useState();
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
        gender: '',
        class_id: '',
        section_id: '',
        roll_no: '',
        blood_group: '',
        nationality: ''
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
    }
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
        if (studentData.class_id.toString().trim() === "") {
            errors.class_id = "Enter a class ID";
        }
        if (studentData.section_id.toString().trim() === "") {
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
            alert("Fill form correctly")
        } else {
            //console.log(studentData)
            // alert("Form can be submitted")

            axiosInstance.patch(`${process.env.REACT_APP_SERVER_URL}/api/update`, studentData, {
                withCredentials: true,
            }).then(response => {
                //console.log(response.data)
                toast.success("Student Edited Successfully")
                navigate("/admin/students");
            }).catch(error => {
                if (error.response) {
                    //console.log(error.response)
                    alert(error.response.data.error)
                }
            })
        }
    }
    const getStudentData = useCallback(async () => {
        // const classData = await getClass();
        // setClasses(classData)
        const result = await getStudentById(id);
        // //console.log(result[0])
        setStudentData({ ...result[0], role: "student" })
    }, [id])
    const getSectionData = async (class_id) => {
        if (class_id) {

            const sectionData = await getSectionByClass(class_id);
            setSection(sectionData)
        }
    }
    useEffect(() => {
        getStudentData();
    }, [getStudentData])
    useEffect(() => {
        getSectionData(studentData.class_id);
    }, [studentData.class_id])


    return (
        <div className='main_container'>
            <div className='backmenu'>
                <h1 className='back'>

                    <Link className='link' to={`/admin/students`}> <IoMdArrowRoundBack /></Link>
                </h1>

                <h1 style={{ textAlign: 'center' }}>Edit Student</h1>
            </div>

            <form onSubmit={handleSubmit} className='student_form' action="" noValidate>
                <div className='input-container'>

                    <label htmlFor="fname">First Name</label>
                    <input value={studentData?.fname} onChange={handleChange} type="text" id='fname' name="fname" required />
                    {validationError.fname && (<span>{validationError.fname}</span>)}
                </div>
                <div className='input-container'>

                    <label htmlFor="mname">Middle Name</label>
                    <input value={studentData?.mname} onChange={handleChange} id='mname' type="text" name="mname" />
                </div>
                <div className='input-container'>

                    <label htmlFor="lname">Last Name</label>
                    <input value={studentData?.lname} onChange={handleChange} id='lname' type="text" name="lname" required />
                    {validationError.lname && (<span>{validationError.lname}</span>)}
                </div>
                <div className='input-container'>

                    <label htmlFor="email">Email</label>
                    <input disabled style={{ color: "white" }} value={studentData?.email} required onChange={handleChange} id='email' type="text" name="email" />
                    {validationError.email && (<span>{validationError.email}</span>)}
                </div>
                <div className='input-container'>

                    <label htmlFor="dob">Dob</label>
                    <input value={studentData?.dob} required onChange={handleChange} id='dob' type="date" name="dob" />
                    {validationError.dob && (<span>{validationError.dob}</span>)}
                </div>
                <div className='input-container'>
                    <label htmlFor="contacts">Contact One</label>
                    <input value={studentData?.primary_contact} required onChange={handleChange} id='contacts' type="text" name="primary_contact" />
                    {validationError.primary_contact && (<span>{validationError.primary_contact}</span>)}

                </div>
                <div className='input-container'>

                    <label htmlFor="contacts">Contact Two</label>
                    <input value={studentData?.secondary_contact} required onChange={handleChange} type="text" name="secondary_contact" />
                    {validationError.secondary_contact && (<span>{validationError.secondary_contact}</span>)}

                </div>
                <div className='input-container'>

                    <label htmlFor="temporary_address">Temporary Address</label>
                    <input value={studentData?.temporary_address} required onChange={handleChange} id='temporary_address' type="text" name="temporary_address" />

                </div>
                <div className='input-container'>

                    <label htmlFor="permanent_address">Permanent Address</label>
                    <input value={studentData?.permanent_address} required onChange={handleChange} id='permanent_address' type="text" name="permanent_address" />
                    {validationError.permanent_address && (<span>{validationError.permanent_address}</span>)}
                </div>
                <div className='input-container gender'>

                    <label htmlFor="gender">Gender</label>
                    <div className="genderinput">

                        <input checked={studentData?.gender === 'M'} required onChange={handleChange} type="radio" name="gender" value={"M"} />Male
                        <input checked={studentData?.gender === 'F'} required onChange={handleChange} type="radio" name="gender" value={"F"} />Female
                        <input checked={studentData?.gender === 'O'} required onChange={handleChange} type="radio" name="gender" value={"O"} />Other
                    </div>
                    {validationError.gender && (<span>{validationError.gender}</span>)}
                </div>
                <div className='input-container'>

                    <label htmlFor="class_id">Class</label>

                    <ClassInput value={studentData?.class_id} handleChange={handleChange} />
                    {validationError.class_id && (<span>{validationError.class_id}</span>)}
                </div>
                <div className='input-container'>

                    <label htmlFor="section_id">Section</label>
                    <select value={studentData?.section_id} required className='selectBox' onChange={handleChange} name="section_id" id="">
                        <option value="">Select Section</option>
                        {
                            section?.map((sec) => {
                                return <option key={sec.section_id} value={sec.section_id}>{sec.section_name}</option>
                            })
                        }
                    </select>
                    {validationError.section_id && (<span>{validationError.section_id}</span>)}
                </div>
                <div className='input-container'>
                    <label htmlFor="roll_no">Roll No</label>
                    <input disabled style={{ color: "white" }} value={studentData?.roll_no} required onChange={handleChange} id='roll_no' type="number" name="roll_no" />

                </div>
                <div className='input-container'>

                    <label htmlFor="blood_group">Blood Group</label>
                    <select value={studentData?.blood_group} required className='selectBox' onChange={handleChange} name="blood_group" id="">
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
                    <select value={studentData?.nationality} required className='selectBox' onChange={handleChange} name="nationality" id="">
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

export default EditStudent