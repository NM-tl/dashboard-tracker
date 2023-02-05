import React, { useEffect, useState } from 'react';
import './DateDeadline.css'

export default function DateDeadline(props) {

    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const deadline = props.date;

    const calcTime = () => {

        const time = Date.parse(deadline) < Date.now() ? '0' : Date.parse(deadline) - Date.now();

        setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
        setMinutes(Math.floor((time / 1000 / 60) % 60));
        setSeconds(Math.floor((time / 1000) % 60));
    }

    useEffect(() => {
        const interval = setInterval(() => calcTime(deadline), 1000);
        return () => clearInterval(interval);
    }, []);


  return (
    <div className='deadline-container'>
        <div className='deadline-item'>
            <div>{days}</div>
            <div className='deadline-item__text'>Days</div>
        </div>
        <div className='deadline-item'>
            <div>{hours}</div>
            <div className='deadline-item__text'>Hours</div>
        </div> 
        <div className='deadline-item'>
            <div>{minutes}</div>
            <div className='deadline-item__text'>Minutes</div>
        </div> 
        <div className='deadline-item'>
            <div>{seconds}</div>
            <div className='deadline-item__text'>Seconds</div>
        </div>           
    </div>
  )
}