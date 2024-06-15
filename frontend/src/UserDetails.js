import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserDetails = () => {
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
        </div>
    );
};

export default UserDetails;