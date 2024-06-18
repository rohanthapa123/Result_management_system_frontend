import React, { useEffect, useState } from 'react'
import "./dashboard.css"
import { chart as ChartJS, defaults } from "chart.js/auto"
import { Bar, Line } from 'react-chartjs-2'
import axios from 'axios';

defaults.maintainAspectRatio = true;
defaults.responsive = true;
defaults.color = "black";
defaults.scales.color = "black";
defaults.font.size = 15;

defaults.plugins.title.display = true;
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";
defaults.plugins.title.align = "start";

const StudentDashboard = () => {

    const [terms, setTerms] = useState()
    const [marks, setMarks] = useState()
    const [allTermMarks, setAllTermMarks] = useState()
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

    const getTerminalData = async (e) => {

        // console.log(e.target.value)
        let res;
        if (e?.target?.value) {

            res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/terminalMarks/${e.target.value}`, {
                withCredentials: true,
            });
        } else {
            res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/terminalMarks/1`, {
                withCredentials: true,
            });
        }
        // console.log(res.data.data[0])
        const marksData = res.data.data[0];

        if (marksData.length !== 0) {

            const formatted = marksData?.map((item, index) => {
                return {
                    "label": item.subject_name,
                    "data": [item.marks_obtained],
                    "backgroundColor": colors[index % 4],
                    "borderColor": borderColor[index % 4],
                    "borderRadius": 5,
                    "borderWidth": 1,

                }
            })
            setMarks(formatted);
        } else {
            setMarks(null)
        }
        // console.log(marks)
    }
    const getAllTermMarks = async () => {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/allterminalmarks`, {
            withCredentials: true,
        });
        // console.log(res.data.data[0])
        const rawAllTermMarksData = res.data.data[0];
        const subjectMap = {};
        rawAllTermMarksData?.forEach((item, index) => {
            if (!subjectMap[item.subject_name]) {
                subjectMap[item.subject_name] = {
                    label: item.subject_name,
                    data: [],
                    borderRadius: 5,
                    backgroundColor: colors[index % 4],
                    borderColor: borderColor[index % 4],
                    borderWidth: 1,

                };
            }
            subjectMap[item.subject_name].data.push(item.marks_obtained);
        });
        setAllTermMarks(Object.values(subjectMap))
        console.log(Object.values(subjectMap))
    }

    useEffect(() => {
        const getTerms = async () => {
            const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/terms`, {
                withCredentials: true,
            });
            // console.log(res)
            setTerms(res.data.data)
        }
        getTerminalData()

        getTerms();

        getAllTermMarks();

    }, [])

    return (
        <div className='student-dashboard'>
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
                                    plugins:{
                                        title:{
                                            text : "Semester Performance"
                                        }
                                    }
                                }}
                            /> : <h1>No data</h1>
                    }
                </div>
                <div>Anything</div>
            </div>
        </div>
    )
}

export default StudentDashboard