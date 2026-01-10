import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function MainMenu() {
    const navigate = useNavigate();
    const [goal, setGoal] = useState("focused");
    const [mood, setMood] = useState("calm");

    const createRoom = () => {
        // Here you would normally send the goal and mood to your backend
        // and get back a room configuration. For now, we just navigate
        // to the Room component.
        navigate('/room', { state: { goal, mood } });
    }

    return (
        <div>
            <h1>Create Your Space</h1>
            {/* Selectors */}
            
            
            <button onClick={createRoom}>Create Room</button>
        </div>
    )
}