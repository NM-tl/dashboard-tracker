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
import { SliderValueLabelUnstyled } from '@mui/base';

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
    }, []);

    let doneCounter = tasks.filter((task) => task.status === true && task.uid === user.uid).length;
    let underDoneCounter = tasks.filter((task) => task.status === false && task.uid === user.uid).length;

    // function averageСost(arr) {
    //     return arr.reduce((partial_sum, a) => partial_sum + a, 0) / arr.length; 
    //  }
     
    //  console.log(averageСost([3, 6, 2, 9]));

    // const data = [
    //     {name: "Ann", age: 24},
    //     {name: "Bred", age: 27},
    //     {name: "Grace", age: 21},
    //     {name: "Alex", age: 30},
    //     {name: "Robby", age: 25}
    //   ];
      
    //   let avg = data.reduce((r,i) => r + i.age/data.length, 0.0);
    //   console.log(avg);

    // tasks.filter((task) => task.status === true && task.uid === user.uid)

    // const calcAvg = () => {
    //     const userTasks = tasks.filter((task) => task.status === true && task.uid === user.uid);
    //     let values = userTasks.map((task) => task.timeMark)

    //     let avg = values.reduce((r, i) => r + i / values.length, 0.0);
    //     console.log(avg)
    // }

    // calcAvg()
    // // const value = tasks.map((task) => task.timeMark)

    // // let inputData = '1, -5.8 или 10, хотя 34 + -5.3 и 73'; 

    // function getString(str) {
    //     let result = str.match(/(-?\d+(\.\d+)?)/g).map(v => +v);
    //     console.log(result)
    // }

    // // getString()

    // const today = new Date();
    // const hours = today.getUTCHours();

    // console.log(today)
   

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
