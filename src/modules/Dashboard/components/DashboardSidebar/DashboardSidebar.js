import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../../common/css/Buttoms/Buttoms.css'
import '../../../../common/css/Buttoms/MenuButtoms/MenuButtoms.css'
import PersonIcon from '@mui/icons-material/Person';
import CreateIcon from '@mui/icons-material/Create';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CheckIcon from '@mui/icons-material/Check';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { UserAuth } from '../../../../context/AuthContext';


export default function DashboardSidebar() {

const navigate = useNavigate();
const { user } = UserAuth();

const addTaskHandler = (e) => {
    navigate('/addtask');
}

const doneTasksHandler = (e) => {
    navigate('/donetasks');
}

const dashboardHandler = (e) => {
    navigate('/dashboard');
}

const profileHandler = (e) => {
    navigate('/profile');
}

const rewardsHandler = (e) => {
    navigate('/rewards');
}

const statisticHandler = (e) => {
    navigate('/statistic');
}


  return (
    <div className='dashboard-sidebar'>
        <div className='userInfo'>
            <div className='user-avatar'>
                {
                    !user.photoURL ? <AccountCircleIcon style={{ width: '64px', height: '64px' }} /> : <img style={{ width: '64px', height: '64px', borderRadius: '50%' }} alt='img' src={user.photoURL} />
                }
            </div>
            <div className='user-name'>
                <h4>{!user.displayName ? '' : user.displayName}</h4>
            </div>
            <div className='user-email'>
                <h4>{!user.email ? localStorage.getItem('email') : user.email}</h4>
            </div>
        </div>
            <div className='dashboard-menu'>
                <button className='btn menu-btn' onClick={profileHandler}><PersonIcon className='menu-btn__icon' />Profile</button>
                <button className='btn menu-btn' onClick={dashboardHandler}><DashboardIcon />Dashboard</button>
                <button className='btn menu-btn' onClick={addTaskHandler}><CreateIcon />Add Task</button>
                <button className='btn menu-btn' onClick={doneTasksHandler}><CheckIcon />Done Tasks</button>
                <button className='btn menu-btn' onClick={statisticHandler}><ShowChartIcon />View Statistic</button>
                <button className='btn menu-btn' onClick={rewardsHandler}><EmojiEventsIcon />My Rewards</button>
            </div>
    </div>
  )
}
