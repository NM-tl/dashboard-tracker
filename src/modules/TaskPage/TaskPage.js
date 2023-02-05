import React, { useState, useEffect } from 'react';
import DashboardHeader from '../Dashboard/components/DashboardHeader/DashboardHeader';
import DashboardSidebar from '../Dashboard/components/DashboardSidebar/DashboardSidebar';
import { db } from '../../firebase-config';
import {
  collection,
  getDocs,
} from "firebase/firestore";
import { useParams } from 'react-router-dom';
import LowChip from '../../common/components/Chips/LowChip';
import MediumChip from '../../common/components/Chips/MediumChip';
import HighChip from '../../common/components/Chips/HighChip';
import './TaskPage.css'
import TaskControls from './components/TaskControls.js/TaskControls';
import DateDeadline from './components/DateDeadline/DateDeadline';

export default function TaskPage() {

  const { id } = useParams();
  const [tasks, setTastks] = useState([]);
  
  const tasksCollectionRef = collection(db, "Tasks");

  useEffect(() => {
    const getTasks = async () => {
      const data = await getDocs(tasksCollectionRef);
      setTastks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getTasks();
  }, [tasksCollectionRef]);

  return (
    <div className='page'>
    <div className='dashboard'>
        <div className='dashboard-wrapper'>
            <DashboardSidebar />
            <div className='mainHalf'>
                <DashboardHeader />
                <>
                
          {tasks.filter((task) => task.id === id).map((task) => {      

            const title = task.title;
            const priority = task.priority;
            const date = task.date;
            const description = task.description;
            const status = task.status;
            const dayDone = task.dayDone;
            const dayValue = task.dayValue;
            const timeMark = task.timeMark;

            return(
              <div className='task'>
                <div className='task-header'>
                  <div className='task-title'><h1>{title}</h1></div>
                  <div className='task-info'>
                    <div>
                      {
                        (priority === 'Low' && <LowChip />)
                      || (priority === 'Medium' && <MediumChip />)
                      || (priority === 'High' && <HighChip />)
                      }  
                    </div>
                    <div className='task-info__deadlines'>
                      <div className='task-date'>Before: {date}</div>
                      <DateDeadline date={date}/>
                    </div>
                  </div>
                </div>
                <div className='task-desc'>{description}</div>       
                <TaskControls value={{status: status, id: id, dayDone: dayDone, dayValue: dayValue, timeMark: timeMark}}/>
              </div>
            );
          })}

    </>
            </div>
        </div>
    </div>
    </div>
  )
}