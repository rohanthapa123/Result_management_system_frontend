import React, { useEffect, useState } from 'react';
import { getClass } from '../../../services/fetchFunction';
import "../markpage.css";
import { getAllMarksOfClassByExam } from '../../../services/FetchFunctions/MarkFetch/markfetch';
import { exportMarksheet } from './exportService'; 
import ImportComponent from './ImportComponent'; 

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
    if (studentMarks.length > 0) {
      exportMarksheet(studentMarks);
    } else {
      alert("No data to export.");
    }
  };

  const handleFileUpload = (file) => {
    // Process the uploaded file
    console.log("Uploaded file:", file);
    // Implement processing logic here
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

      <ImportComponent onFileUpload={handleFileUpload} />

      <table>
        {/* Table content */}
      </table>

      <div>
        <button onClick={handleExport}>Export Marksheet</button>
      </div>
    </div>
  );
};

export default MarkPage;
