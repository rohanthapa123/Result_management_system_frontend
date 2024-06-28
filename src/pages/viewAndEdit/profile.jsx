
import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { LuUploadCloud } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import oip from "../../assets/OIP.jpeg";
import { getMyDetails } from '../../services/fetchFunction';
import "./profile.css";
import Spinner from '../../components/loader/Spinner';
import axiosInstance from '../../services/axiosInstance';
const Profile = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState();
  const [flag, setFlag] = useState(false);
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const handlePassChange = (e) => {
    setPassword(prev => ({ ...prev, [e.target.name]: e.target.value }))
    //console.log(password)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.newPassword !== password.confirmPassword) {
      setError("Passsword Doesnot Match")
      return;
    }
    await axiosInstance.post(`${process.env.REACT_APP_SERVER_URL}/api/changepassword`, password, {
      withCredentials: true,
    }).then((response) => {
      // //console.log(response)
      localStorage.clear();
      
      navigate("/login")
    }).catch((error) => {
      //console.log(error)
      setError(error.response.data.message)
    })
  }
  const [changePasswordFlag, setChangePasswordFlag] = useState(false);
  const [file, setFile] = useState()
  const fetchUserData = async () => {
    setLoading(true)
    const user = await getMyDetails();
    //console.log("user", user);
    localStorage.setItem("image", user.image)
    setUserData(user);
    setLoading(false)
  }
  const handleChange = (e) => {
    //console.log(e.target.files[0])
    setFile(e.target.files[0]);

  }
  const handleUpload = () => {
    if (!file) {
      //console.log("Select File");
      return;
    }
    const fd = new FormData();
    fd.append('image', file);
    axiosInstance.post(`${process.env.REACT_APP_SERVER_URL}/api/changeprofile`, fd, {
      withCredentials: true,
    }).then((response) => {
      toast.success("Image uploaded successfully")
      //console.log(response)
    }).catch((error) => {
      toast.error(error.response.data.error);
      // alert(error.response.data.error)
      //console.log(error.response)
    }).finally(() => {
      setFlag(false);
      fetchUserData();
    })


  }
  useEffect(() => {
    fetchUserData();
  }, [])
  return (
    <div className='profileparent'>
      {
        flag ? <div className={`change_profile ${flag ? "show" : ''}`}>
          <input onChange={handleChange} className='change_pic' type="file" name="image" id="change_picture" />
          <h3 className='topic'>Change Picture</h3>
          <label className='uploadLabel' htmlFor="change_picture">
            <div className='input'>
              {file && <img src={URL.createObjectURL(file)} className='previewImage' alt='profileprofile' />}
              <LuUploadCloud size={50} color='green' style={{ margin: 'auto' }} />
              <p>{file?.name}</p>
            </div>
          </label>
          <div className=''>
            <button className='submit' onClick={handleUpload}>Upload</button>
            <button className='cancel' onClick={() => setFlag(false)}>Cancel</button>
          </div>
        </div> : ""
      }
      {
        changePasswordFlag ? <div className={`change_password ${changePasswordFlag ? "show" : ''}`}>
          <form className='foram' onSubmit={handleSubmit}>
            <h4 className='topic'>Change Password</h4>
            <div className='passFormDiv'>
              <label htmlFor="oldPwd" className='passLabel'>
                Old Password
              </label>
              <input onChange={handlePassChange} type="password" name="currentPassword" id="oldPwd" />

            </div>
            <div className='passFormDiv'>
              <label className='passLabel' htmlFor="newpwd">
                New Password
              </label>
              <input onChange={handlePassChange} type="password" name="newPassword" id="newpwd" />

            </div>
            <div className='passFormDiv'>
              <label className='passLabel' htmlFor="cpwd">
                Confirm Password
              </label>
              <input onChange={handlePassChange} type="password" name="confirmPassword" id="cpwd" />
              <span style={{ color: 'red' }}>{error}</span>
            </div>
            <div className="btncollection">
              <button type='submit' className='submit' >Submit</button>
              <button className='cancel' onClick={() => setChangePasswordFlag(false)}>Cancel</button>
            </div>
          </form>
        </div> : ""
      }
      <div className="image_section">
        <div onClick={(e) => setFlag(true)} className='image_edit_icon'>
          <FaEdit className='icon' size={50} color='green' />
        </div>
        <img className='profile_picture' src={userData?.image ? `${process.env.REACT_APP_SERVER_URL}/api/images/${userData.image}` : oip} alt="" srcSet="" />

      </div>
      {
        loading ? <Spinner /> : <div className='general_info'>
          <div>
            <h1 className='head'>Personal Information</h1>

          </div>
          <div className="details-container">
            <div>Name:</div>
            <div>{userData?.fname}  {userData?.mname}  {userData?.lname} ({userData?.role})</div>

          </div>
          <div className="details-container">
            <div>DOB:</div>
            <div>{userData?.dob}</div>

          </div>
          <div className="details-container">
            <div>Gender</div>
            <div>{userData?.gender === 'M' ? "Male" : userData?.gender === 'F' ? "Female" : userData?.gender === 'O' ? "Other" : 'NULL'}</div>
          </div>
          <div className="details-container">
            <div>Email</div>
            <div>{userData?.email}</div>

          </div>
          <div className="details-container">
            <div>Primary Contact</div>
            <div>{userData?.primary_contact}</div>
          </div>
          <div className="details-container">
            <div>Secondary Contact</div>
            <div>{userData?.secondary_contact}</div>
          </div>
          <div className="details-container">
            <div>Permanent Address</div>
            <div>{userData?.permanent_address}</div>
          </div>
          <div className="details-container">
            <div>Secondary Address</div>
            <div>{userData?.temporary_address}</div>
          </div>

        </div>
      }
      <button onClick={() => setChangePasswordFlag(true)} className='change-password'>Change Password</button>

    </div>
  )
}

export default Profile