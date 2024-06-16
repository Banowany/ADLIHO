import React from 'react';
import EventList from "./EventList";
import { Route, Routes } from 'react-router-dom';
import EventDetails from './EventDetails';
import UserDetails from './UserDetails';
import Report from './Report';
import { Container, Navbar } from 'react-bootstrap';

function App() {
    return (
        <div className="App">
            <Navbar  className="bg-secondary bg-gradient">
                <Container>
                    <Navbar.Brand 
                        style={{ 
                            color: '#ffffff',
                            fontSize: '1.4rem',
                            fontWeight: 'bold' 
                        }} 
                        href="/"
                    >
                        ADLIHO
                    </Navbar.Brand>    
                </Container>
            </Navbar>
            <Container className='mt-4'>        
                <Routes>
                    <Route path='/' element={<EventList />} />
                    {/* <Route path='/' element={<div>Pierwszy</div>} /> */}
                    <Route path='/event/:id' element={<EventDetails />} />
                    {/* <Route path='/lol' element={<div>Drugi</div>} /> */}
                    <Route path='/event/:eventId/user/:userId' element={<UserDetails />} />
                    <Route path='/event/:id/report' element={<Report />} />
                </Routes>
            </Container>
        </div>
    );
}

export default App;