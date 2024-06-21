import React, { useEffect, useState } from 'react';
// import ExcelExport from 'react-export-excel';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { getClass } from '../../../services/fetchFunction';
import "../markpage.css";
import { getAllMarksOfClassByExam } from '../../../services/FetchFunctions/MarkFetch/markfetch';
import { toast } from 'react-toastify';
import { CSVLink } from 'react-csv';
import Spinner from '../../../components/loader/Spinner';

// const ExcelFile = ExcelExport.ExcelFile;
// const ExcelSheet = ExcelExport.ExcelSheet;
// const ExcelColumn = ExcelExport.ExcelColumn;

const MarkPage = () => {
  const [classes, setClasses] = useState([]);
  const [term, setTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [studentMarks, setStudentMarks] = useState([]);
  const [loading, setLoading] = useState(false)

  const [csvData, setCsvData] = useState([]);
  const [csvHeaders, setCsvHeaders] = useState([]);

  useEffect(() => {
    const getClassData = async () => {
      const classData = await getClass();
      setClasses(classData);
    };
    getClassData();
  }, []);

  useEffect(() => {
    const getAllMarks = async () => {

      if (selectedClass && term) {
        setLoading(true)
        const marksData = await getAllMarksOfClassByExam(selectedClass, term);
        // setStudentMarks(marksData);
        console.log(marksData)
        setStudentMarks(marksData.map(student => ({
          ...student,
          subjects_marks: student.subjects_marks.sort((a, b) => a.subject_id - b.subject_id)
        })));
        setLoading(false)
      }
    };
    getAllMarks();
  }, [selectedClass, term]);

  const exportToPDF = () => {
    if (studentMarks.length > 0) {
      console.log("Shets")
      const doc = new jsPDF();
      const tableColumn = ["First Name", "Middle Name", "Last Name", ...studentMarks[0]?.subjects_marks.map(subject => subject.subject_name)];
      const tableRows = [];

      studentMarks.forEach(student => {
        const studentData = [
          student.fname,
          student.mname,
          student.lname,
          ...student.subjects_marks.map(subject => subject.marks_obtained || "-")
        ];
        tableRows.push(studentData);
      });

      doc.autoTable(tableColumn, tableRows, { startY: 20 });
      doc.text("Student Marks", 14, 15);
      doc.save(`student_marks_class${selectedClass}.pdf`);
    } else {
      toast.error("Select Class and term first")
    }
  };


  const prepareCsvData = () => {
    const data = studentMarks.map(student => {
      const subjectMarks = student.subjects_marks.reduce((acc, subject) => {
        acc[subject.subject_name] = subject.marks_obtained || "-";
        return acc;
      }, {});
      return {
        firstName: student.fname,
        middleName: student.mname,
        lastName: student.lname,
        ...subjectMarks
      };
    });

    const headers = [
      { label: "First Name", key: "firstName" },
      { label: "Middle Name", key: "middleName" },
      { label: "Last Name", key: "lastName" },
      ...studentMarks[0]?.subjects_marks.map(subject => ({ label: subject.subject_name, key: subject.subject_name }))
    ];

    setCsvData(data);
    setCsvHeaders(headers);
  };

  return (
    <div>
      <div>
        <select onChange={(e) => setSelectedClass(e.target.value)} name="class" id="selectbox">
          <option value="">Select Class</option>
          {classes.map((_class) => (
            <option key={_class.class_id} value={_class.class_id}>
              {_class.class_name}
            </option>
          ))}
        </select>

        <select onChange={(e) => setTerm(e.target.value)} name="exam" id="selectbox">
          <option value="">Select Term</option>
          <option value="1">1st term</option>
          <option value="2">2nd term</option>
          <option value="3">3rd term</option>
        </select>
        {
          studentMarks.length > 0 && <button onClick={exportToPDF} className='exportbtn'>Export to PDF</button>
        }

        {
          studentMarks.length > 0 && <button onClick={prepareCsvData} className='exportbtn'>Prepare Excel Data</button>
        }
        {csvData.length > 0 && (
          <CSVLink data={csvData} headers={csvHeaders} filename={"student_marks.csv"}>
            <button className='exportbtn'>Export to Excel</button>
          </CSVLink>
        )}


      </div>
      <br />
      <hr />
      {
        loading ? <Spinner /> : <table className='dashboardtable'>
        {studentMarks.length > 0 && <thead>
          <tr>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            {/* <th>User ID</th> */}
            {/* <th>Student ID</th> */}
            {studentMarks.length > 0 && studentMarks[0].subjects_marks.map((subject) => (
              <th key={subject.subject_id}>{subject.subject_name}</th>
            ))}
          </tr>
        </thead>}
        <tbody>
          {studentMarks.map((student) => (
            <tr key={student.student_id}>
              <td>{student.fname}</td>
              <td>{student.mname}</td>
              <td>{student.lname}</td>
              {/* <td>{student.user_id}</td> */}
              {/* <td>{student.student_id}</td> */}
              {student.subjects_marks.map((subject) => (
                <td key={subject.subject_id}>{/*subject.subject_name*/}{subject.marks_obtained || "- "}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      }
    </div>
  );
};

export default MarkPage;
