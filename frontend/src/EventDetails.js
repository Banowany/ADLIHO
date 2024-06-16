import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import Modal from "react-modal";
import { Breadcrumb, Button, Modal, Table } from "react-bootstrap";

const EventDetails = () => {
    const {id} = useParams();
    const [event, setEvent] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleGetEvent = () => {
        fetch(`http://localhost:8080/api/events/${id}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                setEvent(data);
            })
            .catch(error => {
                console.error('There was an error fetching the event!', error);
            });
        // axios.get(`http://localhost:8080/api/events/${id}`)
        //     .then(res => {
        //         setEvent(res.data);
        //     })
        //     .catch(err => {
        //         console.error('There was an error fetching the event!', err);
        //     })
    };

    useEffect(handleGetEvent, [id]);

    if(!event) return <div>Loading...</div>;
    
    const handleAddUser = (event) => {
        event.preventDefault();
        fetch(`http://localhost:8080/api/events/${id}/users`, {
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
                handleGetEvent();
                setModalIsOpen(false);
            })
            .catch(error => {
                console.error('There was an error adding the user!', error);
            });
        // axios.post(`http://localhost:8080/api/events/${id}/users`, {
        //     name: event.target[0].value
        // })
        //     .then(res => {
        //         handleGetEvent();
        //         setModalIsOpen(false);
        //     })
        //     .catch(err => {
        //         console.error('There was an error adding the user!', err);
        //     });
    };

    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Event List</Breadcrumb.Item>
                <Breadcrumb.Item active>Event Details</Breadcrumb.Item>
            </Breadcrumb>
            <h1>Event: <span className="text-info">{event.name}</span></h1>
            <h2>Assigned Users:</h2>
            {event.users.length === 0 && <p>No users assigned</p>}
            <Table bordered hover>
                <tbody>
                    {event.users && event.users.map(user => (
                        <tr 
                            key={user.id} 
                            onClick={() => navigate(`/event/${id}/user/${user.id}`)}
                            style={{
                                cursor: 'pointer'
                            }}
                        >
                            <td>
                                {user.name}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button 
                variant="primary" 
                style={{
                        marginRight: '.5rem'
                    }} 
                onClick={() => setModalIsOpen(true)}
            >
                Add User
            </Button>
            <Modal show={modalIsOpen} onHide={() => setModalIsOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id="addUserForm" onSubmit={handleAddUser}>
                        <label>
                            Username:
                            <input type="text" />
                        </label>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" type="submit" form="addUserForm">Close</Button>
                </Modal.Footer>
            </Modal>
            <Button variant="primary" onClick={() => navigate(`/event/${id}/report`)}>Generate Report</Button>
        </div>
    );
};

export default EventDetails;