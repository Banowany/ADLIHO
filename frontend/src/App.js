import React from 'react';
import EventList from "./EventList";
import { Route, Routes } from 'react-router-dom';
import EventDetails from './EventDetails';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<EventList />} />
                {/* <Route path='/' element={<div>Pierwszy</div>} /> */}
                <Route path='/event/:id' element={<EventDetails />} />
                {/* <Route path='/lol' element={<div>Drugi</div>} /> */}
            </Routes>
        </div>
    );
}

export default App;