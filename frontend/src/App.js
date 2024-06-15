import React from 'react';
import EventList from "./EventList";
import { Route, Routes } from 'react-router-dom';
import EventDetails from './EventDetails';
import UserDetails from './UserDetails';
import Report from './Report';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<EventList />} />
                {/* <Route path='/' element={<div>Pierwszy</div>} /> */}
                <Route path='/event/:id' element={<EventDetails />} />
                {/* <Route path='/lol' element={<div>Drugi</div>} /> */}
                <Route path='/event/:eventId/user/:userId' element={<UserDetails />} />
                <Route path='/event/:id/report' element={<Report />} />
            </Routes>
        </div>
    );
}

export default App;