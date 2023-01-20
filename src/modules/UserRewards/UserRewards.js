import React, { useEffect, useState, createContext } from 'react';
import DashboardHeader from '../Dashboard/components/DashboardHeader/DashboardHeader';
import DashboardSidebar from '../Dashboard/components/DashboardSidebar/DashboardSidebar';
import './UserRewards.css';
import RewardsList from './components/RewardsList/RewardsList'

import { db } from '../../firebase-config';
import {
  collection,
  getDocs,
} from "firebase/firestore";


export const RewardsContext = createContext();

export default function UserRewards() {

    const [rewards, setRewards] = useState([]);
    const rewardsCollectionRef = collection(db, "Rewards");
    
    useEffect(() => {
        const getRewards = async () => {
        const data = await getDocs(rewardsCollectionRef);
        setRewards(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
    
        getRewards();
    }, []);

    const rewardsData = rewards;

  return (
    <div className='page'>
        <div className='dashboard'>
        <div className='dashboard-wrapper'>
          <DashboardSidebar />
        <div className='mainHalf'>
          <DashboardHeader />
            <div className='conteiner'>
                <RewardsContext.Provider value={rewardsData}>
                    <RewardsList />
                </RewardsContext.Provider>
            </div>
        </div>  
          </div>
    </div>
    </div> 
  )
}
