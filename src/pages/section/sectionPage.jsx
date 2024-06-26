import React, { useCallback, useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ClassInput from '../../components/ClassInput';
import Pagination from '../../components/pagination/Pagination';
import { getSections } from '../../services/FetchFunctions/Section/SectionFetch';
import { deleteSection } from '../../services/fetchFunction';
import "./section.css";
import Spinner from '../../components/loader/Spinner';

const SectionPage = () => {
  const [sections, setSections] = useState([]);
  const [choosedClass, setChoosedClass] = useState(null);
  const [limit] = useState(12);
  const [totalPages, setTotalPage] = useState();
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getPrevPage = () => {
    const prevPage = currentPage - 1;
    if (prevPage >= 1) {
      const newOffset = (prevPage - 1) * limit;
      setOffset(newOffset);
      setCurrentPage(prevPage);
      getSection(choosedClass, limit, newOffset);
    }
  };

  const getNextPage = () => {
    const nextPage = currentPage + 1;
    if (nextPage <= totalPages) {
      const newOffset = currentPage * limit;
      setOffset(newOffset);
      setCurrentPage(nextPage);
      getSection(choosedClass, limit, newOffset);
    }
  };

  const handleDelete = useCallback(async (id) => {
    try {
      if (window.confirm("Are you sure to delete")) {
        if (await deleteSection(id)) {

          toast.warn("Section Deleted Successfully");
          getSection(choosedClass, limit, offset);
        } else {
          toast.error("Section is being assigned to students")
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [choosedClass, limit, offset]);

  const getSection = async (choosedClass, limit, offset) => {
    setLoading(true);
    const data = await getSections(choosedClass, limit, offset);
    setSections(data.result);
    setTotalPage(data.totalPage);
    setLoading(false);
  };

  const handleChange = (e) => {
    setChoosedClass(e.target.value);
    setOffset(0);
    setCurrentPage(1);
  };

  useEffect(() => {
    getSection(choosedClass, limit, offset);
  }, [choosedClass, limit, offset]);

  return (
    <>
      <div className='heading_edit'>
        <h2>Section</h2>
        <ClassInput small={true} handleChange={handleChange} />
        <Link className="link" to={"add"}><button className="add">Create Section</button></Link>
      </div>
      <br />
      {
        loading ? <Spinner /> : (
          <table className='dashboardtable'>
            <thead>
              <tr>
                <th>Section</th>
                <th>Capacity</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                sections?.map((section, index) => (
                  <tr key={section.section_id} className={index % 2 === 0 ? "even" : "odd"}>
                    <td>{section.section_name}</td>
                    <td>{section.section_capacity}</td>
                    <td className='action'><Link to={`edit/${section.section_id}`}><FaEdit size={20} color="green" /></Link></td>
                    <td className='action'><button onClick={() => handleDelete(section.section_id)}><MdDelete size={20} color="red" /></button></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        )
      }
      <div className="paginationPart">
        <Pagination currentPage={currentPage} getPrevPage={getPrevPage} getNextPage={getNextPage} totalPage={totalPages} />
      </div>
    </>
  );
}

export default SectionPage;
