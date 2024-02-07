import React, { useCallback, useEffect, useState } from 'react'
import "./subject.css"
import { deleteSubject, getSubjects } from '../../services/fetchFunction';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
const SubjectPage = () => {
    const [subjects, setSubjects] = useState();
    const getData = async () => {
        const data = await getSubjects();
        console.log(data)
        setSubjects(data)
    }
    useEffect(() => {
        getData();
    }, []);
    const handleDelete = useCallback(async (id) => {
        try {
            if (window.confirm("Are you sure to delete Subject?")) {

                await deleteSubject(id)
                getData();
            }
        } catch (error) {
            console.log(error)
        }
    }, []);
    return (
        <>
            <h1 className='heading'>Subjects</h1>
            <button className="add"><Link className="link" to={"add"}>Add New Subject</Link> </button>
            <table >
                <thead>
                    <tr>
                        <th>Subject Name</th>
                        <th>Subject Code</th>
                        <th>Class Name</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        subjects?.map((subject) => {
                            return <tr key={subject.subject_id}>
                                <td>{subject.subject_name}</td>
                                <td>{subject.subject_code}</td>
                                <td>{subject.class_name}</td>
                                <td className='action'><button><FaEdit size={20} color="green" /></button></td>
                                <td className='action'><button onClick={(e) => handleDelete(subject.subject_id)}><MdDelete size={20} color="red" /></button></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default SubjectPage