import React, { useEffect, useState } from 'react';
import { db } from '../../../../firebase-config';
import {
    collection,
    getDocs,
  } from "firebase/firestore";
import './DoneTaskItem.css'

import LowChip from '../../../../common/components/Chips/LowChip';
import MediumChip from '../../../../common/components/Chips/MediumChip';
import HighChip from '../../../../common/components/Chips/HighChip';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from 'react-router-dom';
import { UserAuth } from '../../../../context/AuthContext';

export default function DoneTaskItem() {

    const [doneTasks, setDoneTasks] = useState([]);
    const tasksCollectionRef = collection(db, "Tasks");
    const { user } = UserAuth();

    useEffect(() => {
        const getTasks = async() => {
            const data = await getDocs(tasksCollectionRef);
            setDoneTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getTasks();
    }, [tasksCollectionRef]);   
  
  return (
    <>
        {doneTasks.filter((task) => task.status === true && task.uid === user.uid).map((task) => {
          
            return(
            <div className='task-item done'>
                <div className='task-item__title'>{task.title}</div>
                <div className='task-item__info'>
                  {
                    (task.priority === 'Low' && <LowChip />)
                  || (task.priority === 'Medium' && <MediumChip />)
                  || (task.priority === 'High' && <HighChip />)
                  }
                <div className='task-term done'>{task.status === true ? 'Done' : ''}</div>
                </div>
                <Link to={`/donetask/${task.id}`}>
                  <IconButton color="primary" aria-label="upload picture" component="label" className='task-item__chevron'>
                    <ChevronRightIcon />
                  </IconButton>
                </Link>
            </div>
            );
        })}
    </>
  )
}
