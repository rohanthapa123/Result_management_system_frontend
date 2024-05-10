import React, { useEffect, useState } from 'react';
import { getClass } from '../../../services/fetchFunction';
import "../markpage.css";
import { getAllMarksOfClassByExam } from '../../../services/FetchFunctions/MarkFetch/markfetch';
import { saveAs } from 'file-saver';
import jsonToCsv from 'json-to-csv';

const MarkPage = () => {
  const [classes, setClasses] = useState([]);
  const [term, setTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [studentMarks, setStudentMarks] = useState([]);

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
        const marksData = await getAllMarksOfClassByExam(selectedClass, term);
        setStudentMarks(marksData.map(student => ({
          ...student,
          subjects_marks: student.subjects_marks.sort((a, b) => a.subject_id - b.subject_id)
        })));
      }
    };
    getAllMarks();
  }, [selectedClass, term]);

  const handleExport = () => {
    if (studentMarks.length === 0) {
      alert('No data to export');
      return;
    }

    const csvData = studentMarks.map(student => ({
      Name: `${student.fname} ${student.mname} ${student.lname}`,
      ...student.subjects_marks.reduce((acc, curr) => {
        acc[curr.subject_name] = curr.marks_obtained || "-";
        return acc;
      }, {})
    }));

    const csvContent = jsonToCsv(csvData);

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'student_marks.csv');
  };

  return (
    <div>
      <div>
        <select onChange={(e) => setSelectedClass(e.target.value)} name="class" id="">
          <option value="">Select Class</option>
          {classes.map((_class) => (
            <option key={_class.class_id} value={_class.class_id}>
              {_class.class_name}
            </option>
          ))}
        </select>

        <select onChange={(e) => setTerm(e.target.value)} name="exam" id="">
          <option value="">Select Term</option>
          <option value="1">1st term</option>
          <option value="2">2nd term</option>
          <option value="3">3rd term</option>
        </select>
      </div>
      <br />
      <hr />

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            {studentMarks.length > 0 && studentMarks[0].subjects_marks.map((subject) => (
              <th key={subject.subject_id}>{subject.subject_name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {studentMarks.map((student) => (
            <tr key={student.student_id}>
              <td>{student.fname}</td>
              <td>{student.mname}</td>
              <td>{student.lname}</td>
              {student.subjects_marks.map((subject) => (
                <td key={subject.subject_id}>{subject.marks_obtained || "- "}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleExport}>Export Data</button>
    </div>
  );
};

export default MarkPage;
