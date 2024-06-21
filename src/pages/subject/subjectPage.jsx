import React, { useCallback, useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import ClassInput from '../../components/ClassInput';
import Pagination from '../../components/pagination/Pagination';
import { deleteSubject, getSubjects } from '../../services/fetchFunction';
import "./subject.css";
import Spinner from '../../components/loader/Spinner';
// import { toast } from 'react-toastify';//ddone when fetching !!!
const SubjectPage = () => {
    const [subjects, setSubjects] = useState();
    const [_class, setClass] = useState();

    const [limit] = useState(12);
    const [totalPages, setTotalPage] = useState(2);
    const [offset, setOffset] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false)

    const getPrevPage = () => {
        const prevPage = currentPage - 1;
        if (prevPage >= 1) {
            const newOffset = (prevPage - 1) * limit;
            setOffset(newOffset);
            setCurrentPage(prevPage);
            getData(_class, limit, newOffset);
        }
    };

    const getNextPage = () => {
        const nextPage = currentPage + 1;
        //console.log(totalPages)
        if (nextPage <= totalPages) {

            const newOffset = currentPage * limit;
            setOffset(newOffset);
            setCurrentPage(nextPage);
            getData(_class, limit, newOffset);
        }
    };


    const getData = async (_class, limit, offset) => {
        setLoading(true)
        if (_class) {
            // //console.log(_class)
            const data = await getSubjects(_class, limit, offset);
            //console.log(data)
            setSubjects(data.result)
            setTotalPage(data.totalPage)

        } else {
            // //console.log(_class)
            const data = await getSubjects(null, limit, offset);
            //console.log(data)
            setSubjects(data.result)
            setTotalPage(data.totalPage)

        }
        setLoading(false)
    }
    // useEffect(()=>{
    //     getData
    // })
    useEffect(() => {
        getData(_class, limit, offset);
        // eslint-disable-next-line
    }, [_class]);
    const handleDelete = useCallback(async (id) => {
        try {
            if (window.confirm("Are you sure to delete Subject?")) {
                await deleteSubject(id);
                await getData(_class, limit, offset);
            }
        } catch (error) {
            //console.log(error)
        }
        // eslint-disable-next-line
    }, []);
    const handleChange = (e) => {
        //console.log(e.target.value)
        setCurrentPage(1);
        setOffset(0);
        setClass(e.target.value)
    }
    return (
        <>

            <div className='heading_edit'>

                <h2>Subjects</h2>
                <ClassInput handleChange={handleChange} small={true} />
                <Link className="link" to={"add"}><button className="add">Add New Subject</button></Link>
            </div>
            {
                loading ? <Spinner /> : <table className='dashboardtable' >
                    <thead>
                        <tr>
                            <th>Subject Name</th>
                            <th>Subject Code</th>
                            <th>Description</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            subjects?.map((subject, index) => {
                                return <tr key={subject.subject_id} className={index % 2 === 0 ? "even" : "odd"}>
                                    <td>{subject.subject_name}</td>
                                    <td>{subject.subject_code}</td>
                                    <td>{subject.desc}</td>
                                    <td className='action'><Link to={`edit/${subject.subject_id}`}><FaEdit size={20} color="green" /></Link></td>
                                    <td className='action'><button onClick={(e) => handleDelete(subject.subject_id)}><MdDelete size={20} color="red" /></button></td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            }
            <div className="paginationPart">
                <Pagination getNextPage={getNextPage} getPrevPage={getPrevPage} currentPage={currentPage} totalPage={totalPages} />
            </div>
        </>
    )
}

export default SubjectPage