import React, { useEffect, useState } from 'react';
import { getClass } from '../../../services/fetchFunction';
import "../markpage.css";
import { getAllMarksOfClassByExam } from '../../../services/FetchFunctions/MarkFetch/markfetch';
import ReactExport from "react-export-excel";
import jsPDF from "jspdf";
import "jspdf-autotable";

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

  const exportToExcel = () => {
    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

    return (
      <ExcelFile element={<button>Export to Excel</button>} filename="StudentMarks">
        <ExcelSheet data={studentMarks} name="StudentMarks">
          <ExcelColumn label="First Name" value="fname" />
          <ExcelColumn label="Middle Name" value="mname" />
          <ExcelColumn label="Last Name" value="lname" />
          {studentMarks.length > 0 && studentMarks[0].subjects_marks.map((subject) => (
            <ExcelColumn key={subject.subject_id} label={subject.subject_name} value={`subjects_marks.${subject.subject_name}`} />
          ))}
        </ExcelSheet>
      </ExcelFile>
    );
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["First Name", "Middle Name", "Last Name"];
    const tableRows = [];

    studentMarks.forEach((student) => {
      const rowData = [
        student.fname,
        student.mname,
        student.lname,
      ];
      student.subjects_marks.forEach((subject) => {
        rowData.push(subject.marks_obtained || "-");
      });
      tableRows.push(rowData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });

    doc.save("StudentMarks.pdf");
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

      <div>
        {exportToExcel()}
        <button onClick={exportToPDF}>Export to PDF</button>
      </div>

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
    </div>
  );
};

export default MarkPage;
