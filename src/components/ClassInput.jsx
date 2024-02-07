import React, { useEffect, useState } from 'react'
import { getClass } from '../services/fetchFunction';

const ClassInput = ({ handleChange }) => {
    const [classes, setClasses] = useState();
    const getData = async () => {

        const data = await getClass();
        setClasses(data)
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <select className='selectBox' name="class_id" id="class" onChange={handleChange}>

            <option value={''}>Choose Class</option>
            {
                classes?.map((_class) => {
                    return <option key={_class.class_id} value={_class.class_id}>{_class.class_name}</option>
                })
            }

        </select>
    )
}

export default ClassInput