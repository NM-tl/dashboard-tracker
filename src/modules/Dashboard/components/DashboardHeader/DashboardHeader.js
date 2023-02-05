import React from 'react';
import './DashboardHeader.css';
import IconButton from '@mui/material/IconButton';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import CurrentTime from '../../../../common/components/CurrentTime/CurrentTime';
import { useNavigate } from 'react-router-dom';
import '../../../../common/css/Buttoms/Buttoms.css';
import PriorityCounters from './components/PriorityCounters.js/PriorityCounters';
import { UserAuth } from '../../../../context/AuthContext';

export default function DashboardHeader() {

  const { logOut, user } = UserAuth();  
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    try {
      await logOut();
      navigate('/authorization')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='dashboard-header'>
        <div className='dashboard-header__wrapper'>
        <CurrentTime />
        <div className='tasks-counters'>
            <PriorityCounters />
           
        </div>
        <div className='user-control'>
            <IconButton aria-label="logout" onClick={handleSignOut} className="btn">
            <PowerSettingsNewIcon  style={{color: 'white', fontSize: '20px'}} />
            </IconButton>
        </div>
        </div>
    </div>
  )
}
