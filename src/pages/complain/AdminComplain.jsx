import React, { useEffect, useState } from 'react';
import { getComplains, solveComplain } from '../../services/fetchFunction';
import "./complain.css";
import Spinner from '../../components/loader/Spinner';
const AdminComplain = () => {
  const [complains, setComplains] = useState()
  const [loading, setLoading] = useState(false)
  const getComplainData = async () => {
    setLoading(true)
    const data = await getComplains();
    setComplains(data)
    setLoading(false)
  }
  useEffect(() => {
    getComplainData();
  }, [])
  const handleResolve = async (id) => {
    if (window.confirm("Are you sure you solved the problem?")) {
      //update the database status for that complain 
      console.log(id)
      await solveComplain(id);
      getComplainData();
    }
  }
  return (
    <>
      <h2 className='heading_edit'>Complains</h2>
      {
        loading ? <Spinner /> : <table>
            <thead>
              <tr>

                <th>Date Added</th>
                <th>Added By</th>
                <th>Complain</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className='tbody'>
              {
                complains?.map((complain, index) => {
                  return <tr key={complain.complain_id} className={complain.status ? index % 2 === 0 ? "even" : "odd" : 'red'}>

                    <td>{complain.created_at}</td>
                    <td>{complain.fname} {complain.lname}</td>
                    <td>{complain.message}</td>
                    <td>{complain.status ? <span className='solved'>Solved</span> : <span className='pending'>Pending</span>}</td>
                    <td>{complain.status ? <button className='solvedBtn' disabled>Solved</button > : <button onClick={() => handleResolve(complain.complain_id)} className='pendingBtn' >Resolve</button>}</td>
                  </tr>

                })
              }

            </tbody>
          </table>
      }
    </>
  )
}

export default AdminComplain