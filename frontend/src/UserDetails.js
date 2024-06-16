import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import Modal from 'react-modal';
import { Breadcrumb, Button, Modal, Table } from 'react-bootstrap';

const UserDetails = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const { eventId, userId } = useParams();

    const handleGetEvent = () => {
        fetch(`http://localhost:8080/api/events/${eventId}/users/${userId}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                setUser(data);
            })
            .catch(error => {
                console.error('There was an error fetching the event!', error);
            });
        // axios.get(`http://localhost:8080/api/events/${eventId}/users/${userId}`)
        //     .then(res => {
        //         setUser(res.data);
        //     })
        //     .catch(err => {
        //         console.error('There was an error fetching the event!', err);
        //     });
    };

    useEffect(handleGetEvent, [eventId, userId]);

    const handleAddExpense = (event) => {
        event.preventDefault();
        fetch(`http://localhost:8080/api/events/${eventId}/users/${userId}/expenses`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: event.target[0].value,
                description: event.target[1].value
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
                console.error('There was an error adding the expense!', error);
            });
        // axios.post(`http://localhost:8080/api/events/${eventId}/users/${userId}/expenses`, {
        //     amount: event.target[0].value,
        //     description: event.target[1].value
        // })
        //     .then(res => {
        //         console.log(res);
        //         handleGetEvent();
        //         setModalIsOpen(false);
        //     })
        //     .catch(err => {
        //         console.error('There was an error adding the expense!', err);
        //     });
    }

    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item href='/'>Event List</Breadcrumb.Item>
                <Breadcrumb.Item href={`/event/${eventId}`}>Event Details</Breadcrumb.Item>
                <Breadcrumb.Item active>User Expenses</Breadcrumb.Item>
            </Breadcrumb>
            <h1>User: <span className='text-info'>{user && user.name}</span></h1>
            <h2>Assigned Expenses:</h2>
            {user && user.expenses && user.expenses.length === 0 && 
            <div>No expenses assigned to this user.</div>}
            {user && user.expenses && user.expenses.length > 0 &&
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {user && user.expenses && user.expenses.map(expense => (
                        <tr key={expense.id}>
                            <td>{expense.amount}</td>
                            <td>{expense.description}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>}
            <Button variant='primary' onClick={() => setModalIsOpen(true)}>Add Expense</Button>
            <Modal 
                show={modalIsOpen} 
                onHide={() => setModalIsOpen(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id='addExpenseForm' onSubmit={handleAddExpense}>
                        <label>
                            Amount:
                            <input required type='number' min={0.01} step={0.01} />
                        </label>
                        <label>
                            Description:
                            <input type='text' />
                        </label>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' type='submit' form='addExpenseForm'>Add</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UserDetails;