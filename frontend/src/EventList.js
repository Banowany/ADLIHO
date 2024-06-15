import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EventList = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/events')
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the events!', error);
            });
    }, []);

    if (!events) return <div>Loading...</div>;

    return (
        <div>
            <h1>Event List</h1>
            <ul>
            {events.map(task => (
                task.id ? (
                    <li key={task.id}>
                        <Link to={`/event/${task.id}`}>
                            {task.name}
                        </Link>
                    </li>
                ) : null
            ))}
            </ul>
        </div>
    );
}

export default EventList;
