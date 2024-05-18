import React, { useEffect, useState } from 'react';
import "./component.css";
import { getSectionByClass } from '../services/fetchFunction';

const SectionInput = ({ value, small, class_id, handleChange }) => {
    const [sections, setSections] = useState();

    const getData = async () => {
        if (class_id) {

            const data = await getSectionByClass(class_id);
            console.log(data)
            setSections(data)
        }
    }
    useEffect(() => {
        getData();
    }, [class_id])
    return (
        <select value={value} className={`${small ? "small" : ''} selectBox`} name="class_id" id="class" onChange={handleChange}>

            <option className='selectOption' value={''}>Choose Section</option>
            {
                sections?.map((section) => {
                    return <option key={section.section_id} value={section.section_id}>{section.section_name}</option>
                })
            }

        </select>
    )
}

export default SectionInput