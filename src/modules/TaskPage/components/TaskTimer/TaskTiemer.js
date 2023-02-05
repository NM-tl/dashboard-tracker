import React, { useEffect, useState } from 'react';
import './TaskTimer.css';
import { db } from '../../../../firebase-config';
import {
  updateDoc,
  doc,
} from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

export default function TaskTiemer(props) {

  const { status, id, dayValue } = props.value.value;
  
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false)
  const [content, setContent] = useState('start');

  const navigate = useNavigate();
  const dayDone = new Date().toJSON().slice(0, 10);
  const currDayValue = new Date().getDay();

  let localId = localStorage.getItem('ID', id)
  let localHours = localStorage.getItem('hours');
  let localMinutes = localStorage.getItem('minutes');
  let localSeconds = localStorage.getItem('seconds');

  const toggleTimer = () => {
    setIsActive(!isActive);
    setContent(!isActive ? 'stop' : 'start');
    if(id === localId) {
      setSeconds(Number(localSeconds))
      setMinutes(Number(localMinutes))
      setHours(Number(localHours)) 
    } 
  };

  const renderTime = () => {
    if(id !== localId) {
      return `${hours > 9 ? hours :'0' + hours}:${minutes > 9 ? minutes : '0' + minutes}:${seconds > 9 ? seconds : '0' + seconds}`;
    } 
    else {
      return `${localHours > 9 ? localHours :'0' + localHours}:${localMinutes > 9 ? localMinutes : '0' + localMinutes}:${localSeconds > 9 ? localSeconds : '0' + localSeconds}`;
    }
  }

  const updateStatus = async (id, status) => {
    const currDoc = doc(db, "Tasks", id);
    await updateDoc(currDoc, {
      status: !status,
      dayDone: dayDone,
      dayValue: currDayValue,
      timeMark: renderTime(hours, minutes, seconds),
    })

    navigate('/donetasks')
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {

      interval = setInterval(() => {
        localStorage.setItem('ID', id)

        setSeconds(seconds => (seconds + 1) % 60);
        localStorage.setItem('hours', hours);

        seconds === 59 ? setMinutes(minutes => (minutes + 1) % 60) : console.log('');
        localStorage.setItem('minutes', minutes);

        minutes === 59 ? setHours(hours => (hours + 1) % 60) : console.log(''); 
        localStorage.setItem('seconds', seconds);
        }, 1000);
    
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, minutes, hours, id]
  )   
  
  return (
    <div className='task-timer'>
        <div className='task-timer__container'>
          <button className={isActive ? 'btn stop-btn' : 'btn start-btn'} onClick={toggleTimer}>{content}</button>
          <div className='timer-container'>
              <div className={isActive ? 'timer-container text start' : 'timer-container text stop'}>timer</div>
              <div>
                {renderTime()}
               </div>
          </div>
        </div>
        <div className='task-status__container'>
            <button className='btn finish-btn' onClick={() => {
              updateStatus(id, status, dayValue);
              }}>Complite
            </button>          
        </div>
    </div> 
  )
}