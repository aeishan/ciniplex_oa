import React, { useEffect, useState, useRef, useCallback } from 'react';
import Draggable from 'react-draggable';

const CountdownTimer = ({ selectedDate }) => {
    const [timer, setTimer] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    // Memoized function to prevent unnecessary re-creations
    const updateTimer = useCallback(() => {
        if (!selectedDate) {
            setTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            return;
        }

        const diff = new Date(selectedDate) - new Date();
        if (diff <= 0) {
            setTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            return;
        }

        setTimer(() => ({
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / (1000 * 60)) % 60),
            seconds: Math.floor((diff / 1000) % 60),
        }));
    }, [selectedDate]);

    useEffect(() => {
        if (!selectedDate) return;  // Ensure selectedDate exists before running
        updateTimer();  // Instant update when selectedDate changes
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [selectedDate, updateTimer]);

    const loadPosition = (id) => JSON.parse(localStorage.getItem("timerPositions"))?.[id] || { x: 0, y: 0 };
    const savePosition = (id, position) => {
        const positions = JSON.parse(localStorage.getItem("timerPositions")) || {};
        localStorage.setItem("timerPositions", JSON.stringify({ ...positions, [id]: position }));
    };

    const DraggableBox = ({ id, label, value }) => {
        const nodeRef = useRef(null);  // Stores position so it doesn't need to re-render everytime
        const [position, setPosition] = useState(loadPosition(id));

        useEffect(() => savePosition(id, position), [position, id]);

        return (
            <Draggable nodeRef={nodeRef} position={position} onDrag={(e, data) => setPosition({ x: data.x, y: data.y })}>
                <div ref={nodeRef} className="timerBackground">
                    <div className="timerBox">
                        <h2 className={`${id}Label`}>{label}</h2>
                        <p className={`${id}Num`}>{value}</p>
                    </div>
                </div>
            </Draggable>
        );
    };

    return (
        <div className="timer">
            {["days", "hours", "minutes", "seconds"].map((unit) => (
                <DraggableBox key={unit} id={unit} label={unit.charAt(0).toUpperCase() + unit.slice(1)} value={timer[unit]} />
            ))}
        </div>
    );
};

export default CountdownTimer;
