import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getClass, getExams, getMarksOfClassByExam } from '../../../services/fetchFunction';
import "../markpage.css";
const TeacherMarkPage = () => {
  const [classes, setClasses] = useState();
  const [exams, setExams] = useState();
  const [studentMarks, setStudentMarks] = useState([])
  const [selectedClass, setSelectedClass] = useState();
  const [selectedExam, setSelectedExam] = useState();
  const [result, setResult] = useState();

  const getClassData = async () => {
    const classData = await getClass();
    setClasses(classData);
  }
  const getExamData = async () => {
    console.log(selectedClass)
    if (selectedClass) {

      const examData = await getExams(selectedClass);
      setExams(examData);
    }
  }

  const handleResultChange = (event, student_id) => {
    const { name, value } = event.target;
    if (name === 'marks_obtained') {
      Number(value);
      let grade, remarks;
      console.log(value)
      if(value > 100 || value < 0){
        window.alert("Value Exceeded Limit");
        return;
      }
      if (value > 90) {
        remarks = "Distinction"
        grade = "A"
      } else if (value > 80) {
        remarks = "Very Good"
        grade = "A-"
      } else if (value > 70) {
        remarks = "First Division"
        grade = "B+"
      } else if (value > 60) {
        remarks = "Second Division"
        grade = "B"
      } else if (value >= 50) {
        remarks = "Pass"
        grade = "B-"
      } else if (value >= 40) {
        remarks = "Just Pass"
        grade = "C"
      } else {
        remarks = "Fail"
        grade = "F"
      }
      setResult(prev => prev.map((student) => {
        return student.student_id == student_id ? { ...student, [name]: value, grade: grade, remarks: remarks } : student;
      }))
    }

    setResult(prev => prev.map((student) => {
      return student.student_id == student_id ? { ...student, [name]: value } : student;
    }))
    console.log(result)
  }

  const getMarksOfClass = async () => {
    if (selectedClass && selectedExam) {
      setStudentMarks([]);

      const studentMarksData = await getMarksOfClassByExam(selectedClass, selectedExam);
      // console.log(studentMarksData);
      setStudentMarks(studentMarksData);
      const filtered = studentMarksData.map((student) => {
        return { name: student.fname + " " + student.mname + " " + student.lname, student_id: student.student_id, subject_id: student.subject_id, exam_id: student.exam_id, marks_obtained: student.marks_obtained, remarks: student.remarks, grade: student.grade }
      })
      setResult(filtered);
      // console.log("result", result)
    }

  }
  const insertMark = async () => {
    try {
      if (window.confirm("Confirm your marks")) {

        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/insertMarks`, {result , class: selectedClass}, {
          withCredentials: true,
        });
        if (response.status == 200) {
          // window.alert("Successfully inserted marks");
          toast.success("Marks inserted successfully");
        }
        // console.log(response.status)
        return response.data.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getClassData();
  }, [])
  useEffect(() => {
    getExamData();
    getMarksOfClass();
  }, [selectedClass, selectedExam])
  return (
    <div>
      {/* <input type="search" name="searchmark" id="" placeholder='Search Student Name' /> */}
      <div>
        <select onChange={(e) => setSelectedClass(e.target.value)} name="class" id="">
          <option value="">select class</option>
          {
            classes?.map((_class) => {
              return <option key={_class.class_id} value={_class.class_id}>{_class.class_name}</option>
            })
          }
        </select>

        <select onChange={(e) => { setSelectedExam(e.target.value) }} name="exam" id="">
          <option value="">select exam</option>
          {
            exams?.map((exam) => {
              return <option key={exam.exam_id} value={exam.exam_id}>{exam.exam_name} {exam.subject_name}</option>
            })
          }
        </select>
      </div>
      <br />
      <hr />

      <table>
        {
          result ? <thead>
            <tr>
              <th>Name</th>
              {
                studentMarks[0] ? <th>{studentMarks[0].subject_name}</th> : <th>subject</th>
              }
              <th>remarks</th>
              <th>gpa</th>
            </tr>
          </thead>
            : ""
        }
        <tbody>
          {
            result?.map((studentMark) => {
              return <tr key={studentMark.student_id}>
                <td>{studentMark.name} </td>
                <td>
                  <input min={"0"} max={"100"} type="number" onChange={(e) => { handleResultChange(e, studentMark.student_id) }} name="marks_obtained" value={studentMark.marks_obtained || ""} id="" />

                </td>
                <td>
                  <input type="text" onChange={(e) => { handleResultChange(e, studentMark.student_id) }} name="remarks" value={studentMark.remarks || ""} id="" />

                </td>
                <td>

                  <input type="text" onChange={(e) => { handleResultChange(e, studentMark.student_id) }} name="grade" value={studentMark.grade || ""} id="" />
                </td>


              </tr>
            })
          }

        </tbody>
      </table>
      {
        result ? <button className='submitmarks' onClick={insertMark}>Insert Marks</button> : ""
      }



    </div>
  )
}

export default TeacherMarkPage