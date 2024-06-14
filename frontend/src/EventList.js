import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

    return (
        <div>
            <h1>Event List</h1>
            <ul>
                {events.map(task => (
                    <li key={task.id}>
                        {task.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EventList;
