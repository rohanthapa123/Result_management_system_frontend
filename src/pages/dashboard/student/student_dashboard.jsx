import axios from 'axios';
import { defaults } from "chart.js/auto";
import React, { useCallback, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import "./dashboard.css";
import Spinner from '../../../components/loader/Spinner';

defaults.maintainAspectRatio = true;
defaults.responsive = true;
defaults.color = "black";
defaults.scales.color = "black";
defaults.font.size = 15;

defaults.plugins.title.display = true;
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";
defaults.plugins.title.align = "start";

const colors = [
    'rgba(255, 99, 132, 0.7)',  // light red
    'rgba(54, 162, 235, 0.7)',  // light blue
    'rgba(75, 192, 192, 0.7)',  // light green
    'rgba(153, 102, 255, 0.7)', // light purple
    'rgba(255, 159, 64, 0.7)'   // light orange
];

const borderColor = [
    'red',  // red
    'blue',  // blue
    'green',  // green
    'purple', // purple
    'orange'   // orange
];
const StudentDashboard = () => {

    const [terms, setTerms] = useState()
    const [marks, setMarks] = useState()
    const [allTermMarks, setAllTermMarks] = useState()
    const [loading, setLoading] = useState(false)

    const getTerminalData = useCallback(async (e) => {
        try {
            const termId = e?.target?.value || 1;
            const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/terminalMarks/${termId}`, {
                withCredentials: true,
            });
            const marksData = res.data.data[0];
            if (marksData && marksData.length !== 0) {
                const formatted = marksData.map((item, index) => ({
                    label: item.subject_name,
                    data: [item.marks_obtained],
                    backgroundColor: colors[index % colors.length],
                    borderColor: borderColor[index % borderColor.length],
                    borderRadius: 5,
                    borderWidth: 1,
                }));
                setMarks(formatted);
            } else {
                setMarks(null);
            }
        } catch (error) {
            console.error('Error fetching terminal data:', error);
        }
    }, []);

    const getAllTermMarks = useCallback(async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/allterminalmarks`, {
                withCredentials: true,
            });
            const rawAllTermMarksData = res.data.data[0];
            const subjectMap = {};
            rawAllTermMarksData.forEach((item, index) => {
                if (!subjectMap[item.subject_name]) {
                    subjectMap[item.subject_name] = {
                        label: item.subject_name,
                        data: [],
                        borderRadius: 5,
                        backgroundColor: colors[index % colors.length],
                        borderColor: borderColor[index % borderColor.length],
                        borderWidth: 1,
                    };
                }
                subjectMap[item.subject_name].data.push(item.marks_obtained);
            });
            setAllTermMarks(Object.values(subjectMap));
            console.log(Object.values(subjectMap));
        } catch (error) {
            console.error('Error fetching all term marks:', error);
        }
    }, []);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                // Fetch terms
                setLoading(true)
                const termsRes = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/terms`, {
                    withCredentials: true,
                });
                setTerms(termsRes.data.data);

                // Fetch other data
                await getTerminalData();
                await getAllTermMarks();
                setLoading(false)
            } catch (error) {
                console.error('Error fetching initial data:', error);
            }
        };

        fetchInitialData();
    }, [getTerminalData, getAllTermMarks]);

    return (
        <div className='student-dashboard'>
            {
                loading ? <Spinner /> : <>
                    <div className='performance'>

                        {
                            marks ?
                                <Bar
                                    data={{
                                        labels: ["Current Terminal "],
                                        datasets: marks,

                                    }}
                                    options={{
                                        indexAxis: 'y',
                                        plugins: {
                                            title: {
                                                text: "Terminal Performance"
                                            }
                                        }
                                    }}
                                /> : <h1>Select Term:No data available</h1>
                        }

                        <div className='term-selector'>
                            {
                                terms?.map((item) => {
                                    return <button value={item.term} onClick={(e) => getTerminalData(e)} key={item.term}>{item.term === '1' ? "1st Term" : item.term === '2' ? "Mid term" : "Final Term"}</button>
                                })
                            }
                        </div>
                    </div>
                    <div className='terminal-performance'>

                        <div className='terminal-performance-graph'>
                            {
                                allTermMarks ?
                                    <Bar
                                        data={{
                                            labels: ["1st term", "Mid term", "Final term"],
                                            datasets: allTermMarks,
                                            borderRadius: 15,
                                        }}
                                        options={{
                                            plugins: {
                                                title: {
                                                    text: "Semester Performance"
                                                }
                                            }
                                        }}
                                    /> : <h1>No data</h1>
                            }
                        </div>
                        <div>Anything</div>
                    </div>
                </>
            }
        </div>
    )
}

export default StudentDashboard