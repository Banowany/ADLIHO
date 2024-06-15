import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EventDetails = () => {
    const {id} = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/events/${id}`)
            .then(res => {
                setEvent(res.data);
            })
            .catch(err => {
                console.error('There was an error fetching the event!', err);
            })
    }, [id]);

    if(!event) return <div>Loading...</div>;
    
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
        </div>
    );
};

export default EventDetails;