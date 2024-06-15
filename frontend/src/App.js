import React from 'react';
import EventList from "./EventList";
import { Route, Routes } from 'react-router-dom';
import EventDetails from './EventDetails';
import UserDetails from './UserDetails';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<EventList />} />
                {/* <Route path='/' element={<div>Pierwszy</div>} /> */}
                <Route path='/event/:id' element={<EventDetails />} />
                {/* <Route path='/lol' element={<div>Drugi</div>} /> */}
                <Route path='/event/:eventId/user/:userId' element={<UserDetails />} />
            </Routes>
        </div>
    );
}

export default App;