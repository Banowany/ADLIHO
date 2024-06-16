import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import Modal from 'react-modal';
import { Button, Modal, Table } from 'react-bootstrap';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleGetEvents = () => {
        fetch('http://localhost:8080/api/events')
            .then(response => {
                return response.json();
            })
            .then(data => {
                setEvents(data);
            })
            .catch(error => {
                console.error('There was an error fetching the events!', error);
            });
        // axios.get('http://localhost:8080/api/events')
        //     .then(response => {
        //         setEvents(response.data);
        //     })
        //     .catch(error => {
        //         console.error('There was an error fetching the events!', error);
        //     });
    };

    useEffect(handleGetEvents, []);

    if (!events) return <div>Loading...</div>;

    const handleAddEvent = (event) => {
        event.preventDefault();
        //send to server post method with name of event in body as raw text
        fetch('http://localhost:8080/api/events', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: event.target[0].value
            })
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                // setEvents([...events, data]);
                handleGetEvents();
                setModalIsOpen(false);
            })
            .catch(error => {
                console.error('There was an error creating the event!', error);
            });
        // setModalIsOpen(false);
    };

    return (
        <div>
            <h1>Event List</h1>
            {events.length === 0 && <div>No events found</div>}
            <Table bordered hover>
                <tbody>
                    {events.map(task => (
                        task.id ? (
                            <tr style={{
                                cursor: 'pointer'
                            }}
                                key={task.id}
                            >
                                <td onClick={() => navigate(`/event/${task.id}`)}>
                                    {task.name}
                                </td>
                            </tr>
                        ) : null
                    ))}
                </tbody>
            </Table>
            {/* <ListGroup className='mb-2'>
                {events.map(task => (
                    task.id ? (
                        <ListGroup.Item key={task.id}>
                            <Link to={`/event/${task.id}`}>
                                {task.name}
                            </Link>
                        </ListGroup.Item>
                    ) : null
                ))}
            </ListGroup> */}
            {/* <ul>
            {events.map(task => (
                task.id ? (
                    <li key={task.id}>
                        <Link to={`/event/${task.id}`}>
                            {task.name}
                        </Link>
                    </li>
                ) : null
            ))}
            </ul> */}
            <Button variant='primary' onClick={() => setModalIsOpen(true)}>Create Event</Button>
            <Modal 
                show={modalIsOpen} 
                onHide={() => setModalIsOpen(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id='createEventForm' onSubmit={handleAddEvent}>
                        <label>
                            Name:
                            <input type="text" />
                        </label>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' form='createEventForm' type="submit">Create</Button>
                </Modal.Footer>
                {/* <form onSubmit={handleAddEvent}>
                    <label>
                        Name:
                        <input type="text" />
                    </label>
                    <button type="submit">Create</button>
                </form> */}
            </Modal>
        </div>
    );
}

export default EventList;
