import React, { createContext, useEffect, useState } from 'react';
import DashboardHeader from '../Dashboard/components/DashboardHeader/DashboardHeader';
import DashboardSidebar from '../Dashboard/components/DashboardSidebar/DashboardSidebar';
import './UserStatistic.css';
import ChartWeek from './components/ChartWeek/ChartWeek';

import UserRatingCard from './components/UserRatingCard/UserRatingCard';

import { db } from '../../firebase-config';
import {
  collection,
  getDocs,
} from "firebase/firestore";
import { UserAuth } from '../../context/AuthContext';
import TaskDoneCard from './components/TaskDoneCard/TaskDoneCard';

export const taskCounter = createContext();

export default function UserStatistic() {

    const { user } = UserAuth();
    const [tasks, setTasks] = useState([]);
    const tasksCollectionRef = collection(db, "Tasks");

    useEffect(() => {
        const getTasks = async() => {
            const data = await getDocs(tasksCollectionRef);
            setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getTasks();
    }, [tasksCollectionRef]);

    let doneCounter = tasks.filter((task) => task.status === true && task.uid === user.uid).length;
    let underDoneCounter = tasks.filter((task) => task.status === false && task.uid === user.uid).length;   

  return (
    <div className='page'>
        <div className='dashboard'>
        <div className='dashboard-wrapper'>
            <DashboardSidebar />
        <div className='mainHalf'>
            <DashboardHeader />
            <taskCounter.Provider value={{underDoneCounter, doneCounter, tasks}}>
            <div className='container'>
                <div className='container-grid statistic'>
                    <div div className='statistic-box per-week'>
                        <ChartWeek />
                    </div>
                    <div div className='statistic-box info'>
                    <TaskDoneCard />
                    <UserRatingCard />
                    </div> 
                </div>
            </div>
            </taskCounter.Provider>     
        </div>  
        </div>
        </div>
    </div> 
  )
}