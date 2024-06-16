import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { Breadcrumb, ListGroup } from 'react-bootstrap';

const Report = () => {
    const {id} = useParams();
    const [report, setReport] = useState(null);

    const handleGetReport = () => {
        fetch(`http://localhost:8080/api/events/${id}/report`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                setReport(data);
            })
            .catch(error => {
                console.error('There was an error fetching the report!', error);
            });
        // axios.get(`http://localhost:8080/api/events/${id}/report`)
        //     .then(res => {
        //         setReport(res.data);
        //     })
        //     .catch(err => {
        //         console.error('There was an error fetching the report!', err);
        //     });
    }

    useEffect(handleGetReport, [id]);

    if(!report) return <div>Loading...</div>;

    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Event List</Breadcrumb.Item>
                <Breadcrumb.Item href={`/event/${id}`}>Event Details</Breadcrumb.Item>
                <Breadcrumb.Item active>Report</Breadcrumb.Item>
            </Breadcrumb>
            <h1>Report</h1>
            <ListGroup>
                {report && Object.entries(report).map(([key, value]) => (
                    <ListGroup.Item key={key}>
                        {key} must return:
                        <ListGroup>
                            {Object.entries(value).map(([subKey, subValue]) => (
                                <ListGroup.Item key={subKey}>
                                    {subKey} - {subValue} zł
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}

export default Report;