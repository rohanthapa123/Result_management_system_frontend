import React, { useCallback, useEffect, useState } from 'react'
import "./teacherdashboard.css"
import { getTeacherClass, getTeacherSubject } from '../../../services/FetchFunctions/TeacherFetch/TeacherFetch';
import Spinner from "../../../components/loader/Spinner"
const TeacherDashboard = () => {

  const [teacherSubject, setTeacherSubject] = useState();
  const [teacherClass, setTeacherClass] = useState();
  const [loading, setLoading] = useState(false);

  const getTeacherData = useCallback(
    async () => {
      setLoading(true)
      // console.log("hello")
      const classresp = await getTeacherClass();
      const subjectresp = await getTeacherSubject();
      console.log(classresp.data, subjectresp.data)
      setTeacherClass(classresp.data)
      setTeacherSubject(subjectresp.data)
      setLoading(false);
    }, [])

  useEffect(() => {
    getTeacherData();
  }, [getTeacherData])
  return (
    <>
      {
        loading ? <Spinner /> : <div className='teacherdash'>

          {/* <div className="countContainer  teachercard">
          <div className="count teacherdiv">
            <div className='teacherdashhead'>My Class</div>
            <div className="items">
  
              
            </div>
          </div>
        </div>
        <div className="countContainer teachercard">
          <div className="count teacherdiv">
            <div className='teacherdashhead'>My Class</div>
            <div className="items">
  
              {
                teacherSubject?.map((item) => {
                  return <h3 key={item.subject_id}>{item.subject_name} </h3>
                })
              }
            </div>
          </div>
        </div> */}
          <div className='teachercontent'>
            <h1>My Classes</h1>
            <div className="table">
              {
                teacherClass ? <table>
                <thead>
                  <tr>
                    <th>Class Name</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    teacherClass?.map((item, index) => {
                      return <tr key={item.class_id} className={`${index % 2 === 0 ? "even" : "odd"} `}>
                        <td>{item.class_name}</td>
                        <td>{item.desc}</td>
                      </tr>
                    })
                  }
                </tbody>
              </table> : "No Class Assigned"
              }
            </div>
          </div>
          <div className='teachercontent'>
            <h1>My Subjects</h1>
            <div className="table">
              {
                teacherSubject ? <table>
                <thead>
                  <tr>
                    <th>S.N</th>
                    <th>Subject Name</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    teacherSubject?.map((item, index) => {
                      return <tr key={item.subject_id} className={`${index % 2 === 0 ? "even" : "odd"} `}>
                        <td>{index + 1}</td>
                        <td>{item.subject_name}</td>
                      </tr>
                    })
                  }
                </tbody>
              </table> : "No Subject Found "
              }
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default TeacherDashboard