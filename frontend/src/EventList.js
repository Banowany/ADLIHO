import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

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

    const handleAddEvent = (event) => {
        event.preventDefault();
        //send to server post method with name of event in body as raw text
        axios.post('http://localhost:8080/api/events', {
            name: event.target[0].value
        })
            .then(response => {
                setEvents([...events, response.data]);
                setModalIsOpen(false);
            })
            .catch(error => {
                console.error('There was an error creating the event!', error);
            });
        setModalIsOpen(false);
    };

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
            <button onClick={() => setModalIsOpen(true)}>Create Event</button>
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <h2>Create Event</h2>
                <form onSubmit={handleAddEvent}>
                    <label>
                        Name:
                        <input type="text" />
                    </label>
                    <button type="submit">Create</button>
                </form>
            </Modal>
        </div>
    );
}

export default EventList;
