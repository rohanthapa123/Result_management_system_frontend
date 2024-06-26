import React, { useCallback, useEffect, useState } from 'react'
import { getSubjects } from '../services/fetchFunction';

const SubjectInput = ({ value, class_id, handleChange }) => {
    const [subjects, setSubjects] = useState();
    // const [_class_id , setClassId] = useState(value)
    const getData = useCallback(async () => {
        try {
            let data;
            if (class_id) {
                data = await getSubjects(class_id, 100, 0);
            } else {
                data = await getSubjects(null, 100, 0);
            }
            setSubjects(data.result);
            //console.log(data);
        } catch (error) {
            console.error('Error fetching subjects:', error);
        }
    }, [class_id]);

    useEffect(() => {
        getData();
    }, [getData]);
    return (
        <>

            <select value={value} className='selectBox' name="subject_id" id="class" onChange={handleChange}>

                <option value={''}>Choose Subject</option>
                {
                    subjects?.map((subject) => {
                        return <option key={subject.subject_id} value={subject.subject_id}>{subject.subject_name}</option>
                    })
                }

            </select>
        </>
    )
}

export default SubjectInput