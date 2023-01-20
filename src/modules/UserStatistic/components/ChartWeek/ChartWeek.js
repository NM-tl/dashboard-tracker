import React, { useContext, useState, useEffect } from 'react';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { taskCounter } from '../../UserStatistic';
import { UserAuth } from '../../../../context/AuthContext';
import '../../../../common/css/Buttoms/ResetButtoms/ResetButtoms.css'

import {  XAxis, YAxis, AreaChart, Area } from 'recharts';

export default function ChartWeek() {

  let { doneCounter, underDoneCounter, tasks } = useContext(taskCounter);
  const { user } = UserAuth();

  // const [week, setWeek] = useState([
  //   {
  //     name: 'Monday',
  //     uv: 0,
  //     pv: 0, 
  //     number: 1,
  //   },
  //   {
  //     name: 'Tuesday',
  //     uv: 0,
  //     pv: 0,
  //     number: 2,
  //   },
  //   {
  //     name: 'Wednesday',
  //     uv: 0,
  //     pv: 0,
  //     number: 3,
  //   },
  //   {
  //     name: 'Thursday',
  //     uv: 0,
  //     pv: 0,
  //     number: 4,
  //   },
  //   {
  //     name: 'Friday',
  //     uv: 0,
  //     pv: 0,
  //     number: 5,
  //   },
  //   {
  //     name: 'Saturday',
  //     uv: 0,
  //     pv: 0,
  //     number: 6,
  //   },
  //   {
  //     name: 'Sunday',
  //     uv: 0,
  //     pv: 0,
  //     number: 0,
  //   },
  // ]);

  // useEffect(() => {
  //     tasks.filter((task) => {
  //       let valuePv;
  //       let valueUv;

  //       week.some(day => {
  //         if(day.number === task.dayValue && task.status === true && task.uid === user.uid) {
  //           valuePv += 1;
  //           setWeek(day.pv = valuePv);   
  //         } else if (day.number === task.dayValue && task.status === !true && task.uid === user.uid) {         
  //           valueUv += 1
  //           setWeek(day.uv = valueUv);
  //         }
  //       });  
  //     });
  // }, [week]);

  // console.log(week);


  const data = [
    {
      name: 'Monday',
      uv: 0,
      pv: 0, 
      number: 1,
    },
    {
      name: 'Tuesday',
      uv: 0,
      pv: 0,
      number: 2,
    },
    {
      name: 'Wednesday',
      uv: 0,
      pv: 0,
      number: 3,
    },
    {
      name: 'Thursday',
      uv: 0,
      pv: 0,
      number: 4,
    },
    {
      name: 'Friday',
      uv: 0,
      pv: 0,
      number: 5,
    },
    {
      name: 'Saturday',
      uv: 0,
      pv: 0,
      number: 6,
    },
    {
      name: 'Sunday',
      uv: 0,
      pv: 0,
      number: 0,
    },
  ];

  const addValuesToChart = () => {
    tasks.filter((task) => {
      data.some(day => {
        if(day.number === task.dayValue && task.status === true && task.uid === user.uid) {
          day.pv += 1;    
        } else if (day.number === task.dayValue && task.status === !true && task.uid === user.uid) {         
          day.uv += 1;
        }
      })      
    })
  };

  addValuesToChart();

  const resetHandler = () => {
    data.map(day => {
      day.pv = 0;
      day.uv = 0;
    });
  }

  return (
    <>
        <div className='statistic-header week'>
            <div className='statistic-title week'>
              <div>Done tasks per week: {doneCounter}<ShowChartIcon style={{color: '#66bb6a'}} /> </div>
              <div>Underdone tasks per week: {underDoneCounter}<ShowChartIcon style={{color: '#ed6c02'}} /></div>
            </div>
            <button className='reset' onClick={resetHandler}>Reset</button>
        </div>
        <AreaChart width={700} height={300} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ed6c02" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#ed6c02" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#66bb6a" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#66bb6a" stopOpacity={0}/>
            </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <Area type="monotone" dataKey="uv" stroke="#ed6c02" fillOpacity={1} fill="url(#colorUv)" />
        <Area type="monotone" dataKey="pv" stroke="#66bb6a" fillOpacity={1} fill="url(#colorPv)" />
        </AreaChart>
    </>
  )
}
