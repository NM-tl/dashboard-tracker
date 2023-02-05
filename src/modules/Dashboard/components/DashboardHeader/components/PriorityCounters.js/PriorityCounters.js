import React, { useState, useEffect } from 'react'
import { db } from '../../../../../../firebase-config';
import {
  collection,
  getDocs,
} from "firebase/firestore";
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import { UserAuth } from '../../../../../../context/AuthContext';

export default function PriorityCounters() {

    const [tasks, setTastks] = useState([]);
    const tasksCollectionRef = collection(db, "Tasks");
    const { user } = UserAuth();

    useEffect(() => {
        const getTasks = async () => {
        const data = await getDocs(tasksCollectionRef);
        setTastks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getTasks();
  }, [tasksCollectionRef]);
  

    const counterLow = tasks.filter((task) => task.status === false && task.uid === user.uid && task.priority === 'Low').length;
    const counterMedium = tasks.filter((task) => task.status === false && task.uid === user.uid && task.priority === 'Medium').length;
    const counterHigh = tasks.filter((task) => task.status === false && task.uid === user.uid && task.priority === 'High').length;

  return (
    <>
        <Chip variant="outlined" color="error" avatar={<Avatar style={{background: '#d32f2f', color: 'white'}}>{counterHigh}</Avatar>} label="High"/>
        <Chip variant="outlined" color="warning" avatar={<Avatar style={{background: '#ed6c02', color: 'white'}}>{counterMedium}</Avatar>} label="Medium"/>
        <Chip variant="outlined" color="info" avatar={<Avatar style={{background: '#0288d1', color: 'white'}}>{counterLow}</Avatar>} label="Low"/> 
    </>
  )
}
