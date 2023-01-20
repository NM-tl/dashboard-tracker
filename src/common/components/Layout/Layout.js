import React, { Children } from 'react';
import ContentConteiner from './components/ContentConteiner/ContentConteiner';
import DashboardHeader from '../../../modules/Dashboard/components/DashboardHeader/DashboardHeader'
import DashboardSidebar from '../../../modules/Dashboard/components/DashboardSidebar/DashboardSidebar'

export default function Layout() {
  return (
    <div className='page'>
        <div className='dashboard'>
        <div className='dashboard-wrapper'>
          <DashboardSidebar />
        <div className='mainHalf'>
          <DashboardHeader />
          <ContentConteiner>{Children}</ContentConteiner>
        </div>  
          </div>
    </div>
    </div> 
  )
}
