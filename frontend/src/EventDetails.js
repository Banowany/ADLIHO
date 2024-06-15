import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";

const EventDetails = () => {
    const {id} = useParams();
    const [event, setEvent] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleGetEvent = () => {
        axios.get(`http://localhost:8080/api/events/${id}`)
            .then(res => {
                setEvent(res.data);
            })
            .catch(err => {
                console.error('There was an error fetching the event!', err);
            })
    };

    useEffect(handleGetEvent, [id]);

    if(!event) return <div>Loading...</div>;
    
    const handleAddUser = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:8080/api/events/${id}/users`, {
            name: event.target[0].value
        })
            .then(res => {
                handleGetEvent();
                setModalIsOpen(false);
            })
            .catch(err => {
                console.error('There was an error adding the user!', err);
            });
    };

    return (
        <div>
            <h1>{event.name}</h1>
            <h2>Assigned Users:</h2>
            <ul>
                {event.users && event.users.map(user => (
                    <li key={user.id}>
                        {user.name}
                    </li>
                ))}
            </ul>
            <button onClick={() => setModalIsOpen(true)}>Add User</button>
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <h2>Add User</h2>
                <form onSubmit={handleAddUser}>
                    <label>
                        Name:
                        <input type="text" />
                    </label>
                    <button>Add</button>
                </form>
            </Modal>
        </div>
    );
};

export default EventDetails;