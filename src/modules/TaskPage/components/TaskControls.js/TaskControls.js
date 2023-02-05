import React from 'react';
import './TaskControls.css';
import { useNavigate } from 'react-router-dom';
import '../../../../common/css/Buttoms/Buttoms.css';
import TaskTiemer from '../TaskTimer/TaskTiemer';

export default function TaskControls(props) {
  const navigate = useNavigate();

  return (
    <div className='task-controls'>
      <button className='btn back-btn' onClick={() => navigate(-1)}>Back</button>
      <TaskTiemer value={props}/>
    </div>
  )
}