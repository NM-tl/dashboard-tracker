import React, { useContext, useEffect, useState } from 'react';
import { RewardsContext } from '../../UserRewards';
import LinearProgress from '@mui/material/LinearProgress';
import DoneIcon from '@mui/icons-material/Done';

import { UserAuth } from '../../../../context/AuthContext';
import { db } from '../../../../firebase-config';
import {
  collection,
  getDocs,
} from "firebase/firestore";

export default function RewardCard() {

    const rewards = useContext(RewardsContext);
    const tasksCollectionRef = collection(db, "Tasks");
    const { user } = UserAuth();
    const [doneTasks, setDoneTasks] = useState([]);

    

    useEffect(() => {
        const getTasks = async() => {
            const data = await getDocs(tasksCollectionRef);
            setDoneTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getTasks();
    }, []);

    let counter = doneTasks.filter((task) => task.status === true && task.uid === user.uid).length;

    console.log(counter)

    const sortByValue = (value) => {
        return (a, b) => a[value] > b[value] ? 1 : -1;
    }  

    const calcProgress = (value, min = 0, max) => ((value - min) * 100) / (max - min);
 
    const calcToGetAchive = (value, num) => {
        let result = value - num;

        if(result < num) { return ''; }

        return 'more needs to be done: ' + result;
    }      

  return (
    <>
        {rewards.sort(sortByValue('value')).map((reward) => {

            return(
            <div className={reward.value > counter ? 'rewards-item disabled' : 'rewards-item'}>
                <div className='reward-header'>
                    <div className='reward-icon'>{reward.icon}</div>
                    <div className='reward-title'>{reward.title}</div>
                </div>
                <div className='reward-questDesc'>{reward.condition}</div>
                <div className='reward-progress'>
                    <div className='reward-progress__value'>{calcToGetAchive(reward.value, counter)}</div>
                    {
                        counter > reward.value || counter === reward.value ?
                        <div className='reward-progress done'>
                            <DoneIcon style={{color: '#66bb6a'}} />
                            <p>Getted</p>
                        </div> : 
                        <LinearProgress variant="determinate" value={calcProgress(counter, 0, reward.value)} />
                    }
                    
                </div>                         
            </div> 
            );                      
        })
    }
    </>    
  )
}