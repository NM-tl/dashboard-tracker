import React from 'react';
import '../../common/css/style.css';
import DashboardSidebar from '../Dashboard/components/DashboardSidebar/DashboardSidebar';
import DashboardHeader from '../Dashboard/components/DashboardHeader/DashboardHeader';
import DoneTaskItem from './components/DoneTaskItem/DoneTaskItem';
import './DoneTasksPage.css'

export default function DoneTasksPage() {
   
  return (
    <div className='page'>
    <div className='dashboard'>
        <div className='dashboard-wrapper'>
            <DashboardSidebar />
            <div className='mainHalf'>
                <DashboardHeader />
                <div className='tasks-list__done'>
                  <DoneTaskItem />
                </div>
            </div>
        </div>
    </div>
    </div>    
  )
}
