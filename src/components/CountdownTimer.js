import React, { useEffect, useState, useRef } from 'react';
import Draggable from 'react-draggable';

const CountdownTimer = ({ selectedDate }) => {
    const [timer, setTimer] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        calculateDiff();
    }, [selectedDate]);

    useEffect(() => {
        const interval = setInterval(() => {
            calculateDiff();
            // if (timer.days === -1 && timer.hours === -1 && timer.minutes === -1) {  // why does it go -1????
            //     setTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            // }
        }, 1000);
        return () => clearInterval(interval);
    }, [selectedDate]);

    const calculateDiff = () => {
        if (!selectedDate) return;

        const now = new Date();
        const inputDate = new Date(selectedDate);

        const diff = inputDate.getTime() - now.getTime();

        // if (diff === 0) {
        //     setTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        //     return;
        // }

        const totalSeconds = Math.floor(diff / 1000);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalHours = Math.floor(totalMinutes / 60);
        const days = Math.floor(totalHours / 24);

        const seconds = totalSeconds % 60;
        const minutes = totalMinutes % 60;
        const hours = totalHours % 24;

        // if (days === -1 && hours === -1 && minutes === -1 && seconds === -1) {
        //     setTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        //     return;
        // }

        setTimer({ days, hours, minutes, seconds });
    };

    // Function to load saved positions
    const loadPosition = (id) => {
        const savedPositions = JSON.parse(localStorage.getItem("timerPositions")) || {};
        return savedPositions[id] || { x: 0, y: 0 };
    };

    // Function to save position
    const savePosition = (id, position) => {
        const savedPositions = JSON.parse(localStorage.getItem("timerPositions")) || {};
        savedPositions[id] = position;
        localStorage.setItem("timerPositions", JSON.stringify(savedPositions));
    };

    const DraggableBox = ({ id, children }) => {
        const nodeRef = useRef(null);
        const [position, setPosition] = useState(loadPosition(id));
    
        const handleDrag = (e, data) => {
            setPosition({ x: data.x, y: data.y });
        };
    
        useEffect(() => {
            savePosition(id, position);
        }, [position, id]);
    
        return (
            <Draggable nodeRef={nodeRef} position={position} onDrag={handleDrag}>
                <div ref={nodeRef} className="timerBackground"> {/* Move Draggable Wrapper Here */}
                    <div className="timerBox">
                        {children}
                    </div>
                </div>
            </Draggable>
        );
    };

    return (
        <div className="timer">
            {/* <div className="timerContainer"> */}
            <DraggableBox id="days">
                <h2 className="daysLabel">Days</h2>
                <p className="daysNum">{timer.days}</p>
            </DraggableBox>
            <DraggableBox id="hours">
                <h2 className="hoursLabel">Hours</h2>
                <p className="hoursNum">{timer.hours}</p>
            </DraggableBox>
            <DraggableBox id="minutes">
                <h2 className="minutesLabel">Minutes</h2>
                <p className="minutesNum">{timer.minutes}</p>
            </DraggableBox>
            <DraggableBox id="seconds">
                <h2 className="secondsLabel">Seconds</h2>
                <p className="secondsNum">{timer.seconds}</p>
            </DraggableBox>
            {/* </div> */}
        </div>
    );
};

export default CountdownTimer;
