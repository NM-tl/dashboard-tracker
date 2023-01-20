import React, { useState, useEffect, createContext } from 'react'
import '../../common/css/style.css';
import './Dashboard.css';
import TasksList from './components/TasksList/TasksList';
import DashboardSidebar from './components/DashboardSidebar/DashboardSidebar';
import DashboardHeader from './components/DashboardHeader/DashboardHeader';
import { useNavigate } from 'react-router-dom';
import '../../common/css/Scroll/Scroll.css'

import { db } from '../../firebase-config';
import {
  collection,
  getDocs,
} from "firebase/firestore";

export const DataContext = createContext();
export const navigate = useNavigate;

export default function Dashboard() {

  const [tasks, setTastks] = useState([]);

  const tasksCollectionRef = collection(db, "Tasks");

  useEffect(() => {
    const getTasks = async () => {
      const data = await getDocs(tasksCollectionRef);
      setTastks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getTasks();
  }, []);
  
  const tasksData = tasks;
  
  return (
    
    <div className='page'>
        <div className='dashboard'>
        <div className='dashboard-wrapper'>
          <DashboardSidebar />
        <div className='mainHalf'>
          <DashboardHeader />
          <DataContext.Provider value={tasksData}>
            <TasksList />
          </DataContext.Provider>
        </div>  
          </div>
    </div>
    </div> 
  )
}
