import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';

const UserDetails = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const { eventId, userId } = useParams();

    const handleGetEvent = () => {
        axios.get(`http://localhost:8080/api/events/${eventId}/users/${userId}`)
            .then(res => {
                setUser(res.data);
            })
            .catch(err => {
                console.error('There was an error fetching the event!', err);
            });
    };

    useEffect(handleGetEvent, [eventId, userId]);

    const handleAddExpense = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:8080/api/events/${eventId}/users/${userId}/expenses`, {
            amount: event.target[0].value,
            description: event.target[1].value
        })
            .then(res => {
                handleGetEvent();
                setModalIsOpen(false);
            })
            .catch(err => {
                console.error('There was an error adding the expense!', err);
            });
    }

    return (
        <div>
            <h1>{user && user.name} Details</h1>
            <h2>Assigned Expenses:</h2>
            <ul>
                {user && user.expenses && user.expenses.map(expense => (
                    <li key={expense.id}>
                        {expense.description} - {expense.amount}
                    </li>
                ))}
            </ul>
            <button onClick={() => setModalIsOpen(true)}>Add Expense</button>
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <h2>Add Expense</h2>
                <form onSubmit={handleAddExpense}>
                    <label>
                        Amount:
                        <input type="number" step={0.01} />
                    </label>
                    <label>
                        Description:
                        <input type="text" />
                    </label>
                    <button>Add</button>
                </form>
            </Modal>
        </div>
    );
};

export default UserDetails;