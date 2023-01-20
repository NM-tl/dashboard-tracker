import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DashboardHeader from '../Dashboard/components/DashboardHeader/DashboardHeader';
import DashboardSidebar from '../Dashboard/components/DashboardSidebar/DashboardSidebar';
import LowChip from '../../common/components/Chips/LowChip';
import MediumChip from '../../common/components/Chips/MediumChip';
import HighChip from '../../common/components/Chips/HighChip';
import './DoneTaskPage.css'


import { db } from '../../firebase-config';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function DoneTaskPage() {

    const { id } = useParams();
    const [tasks, setTastks] = useState([]);
    const navigate = useNavigate();
  
    const tasksCollectionRef = collection(db, "Tasks");

    useEffect(() => {
        const getTasks = async () => {
        const data = await getDocs(tasksCollectionRef);
        setTastks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getTasks();
    }, []);

    // const deleteTask = async (id) => {
    //   const userDoc = doc(db, "Tasks", id);
    //   await deleteDoc(userDoc)
    // };

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
            const dayDone = task.dayDone;
            const timerTime = task.timeMark;
            
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
                      <div className='date-container'>
                            <div className='date-item'>
                                <div className='date-item__text'>Done✔️</div>
                                <div className='date-item__text bold'>{dayDone}</div>
                            </div>
                            <div className='date-item'>
                                <div className='date-item__text'>TimerTime🕒</div>
                                <div className='date-item__text bold'>{timerTime}</div>  
                            </div>
                        </div> 
                    </div>
                  </div>
                </div>
                <div className='task-desc'>{description}</div> 
                <div className='doneTaskPage-controls'>      
                    <button className='btn back-btn' onClick={() => navigate(-1)}>Back</button>
                    {/* <Link to='/donetasks'>
                      <button className='btn delete-btn' onClick={deleteTask(task.id)}>Delete Task</button>
                    </Link>    */}
                </div>
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
