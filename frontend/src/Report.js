import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const Report = () => {
    const {id} = useParams();
    const [report, setReport] = useState(null);

    const handleGetReport = () => {
        axios.get(`http://localhost:8080/api/events/${id}/report`)
            .then(res => {
                setReport(res.data);
            })
            .catch(err => {
                console.error('There was an error fetching the report!', err);
            });
    }

    useEffect(handleGetReport, [id]);

    if(!report) return <div>Loading...</div>;

    return (
        <div>
            <h1>Report</h1>
            <ul>
                {report && Object.entries(report).map(([key, value]) => (
                    <li key={key}>
                        {key} must return:
                        <ul>
                            {Object.entries(value).map(([subKey, subValue]) => (
                                <li key={subKey}>
                                    {subKey} - {subValue} zł
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Report;