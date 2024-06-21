import React, { useEffect, useState } from 'react'
import { getNotices } from '../../../services/fetchFunction';
import Spinner from '../../../components/loader/Spinner';
import "./studentNotice.css"
const StudentNotice = () => {
  const [classNotice, setClassNotice] = useState();
  const [loading, setLoading] = useState(false)
  const getClassNoticeData = async () => {
    setLoading(true);
    const data = await getNotices();
    //console.log(data)
    setClassNotice(data);
    setLoading(false);
  }
  useEffect(() => {
    getClassNoticeData();
  }, [])
  return (
    <>

      <div className="notice">

        <h3 className='heading'>Class Notice</h3>
        {

          loading ? <Spinner /> : <div className="notices">

            {
              classNotice?.map((notice) => {
                return <div className='eachNotice' key={notice.notice_id}>
                  <div className='date'>{notice.date_posted.slice(0, 10)}</div>
                  <div className='details'>{notice.notice_text}</div>
                </div>
              })
            }
          </div>
        }
      </div>
    </>
  )
}

export default StudentNotice