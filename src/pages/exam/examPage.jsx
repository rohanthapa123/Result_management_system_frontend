import React, { useCallback, useEffect, useState } from 'react'
import "./exam.css"
import { deleteExams, deleteSection, getExams } from '../../services/fetchFunction';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import ClassInput from '../../components/ClassInput';
import { toast } from 'react-toastify';
const ExamPage = () => {
    const [exams, setExams] = useState([]);


    const handleDelete = useCallback(async (id) => {
        try {
            if (window.confirm("Are you sure you want to delete")) {
                await deleteExams(id)

                toast.warning("Exam deleted Successfully")
            }
            getExamData();
        } catch (error) {
            console.log(error)
        }
    }, []);

    const getExamData = async () => {
        const data = await getExams();
        // console.log(data)
        setExams(data)
    }
    useEffect(() => {
        getExamData();
    }, [])
    return (
        <>
            <div className='heading_edit'>

                <h2>Exams</h2>
                <Link className="link" to={"add"}><button className="add">Create Exam</button></Link>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Exam Name</th>
                        <th>Class </th>
                        <th>Subject</th>
                        <th>Date</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        exams?.map((exam, index) => {
                            return <tr key={exam.exam_id} className={index % 2 == 0 ? "even" : "odd"}>
                                <td>{exam.exam_name}</td>
                                <td>{exam.class_name}</td>
                                <td>{exam.subject_name}</td>
                                <td>{exam.exam_date}</td>
                                <td className='action'><Link to={`edit/${exam.exam_id}`}><FaEdit size={20} color="green" /></Link></td>
                                <td className='action'><button onClick={(e) => handleDelete(exam.exam_id)}><MdDelete size={20} color="red" /></button></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default ExamPage