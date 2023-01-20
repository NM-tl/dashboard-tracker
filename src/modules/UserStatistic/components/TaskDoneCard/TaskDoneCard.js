import React, { useContext } from 'react';
import { taskCounter } from '../../UserStatistic';
import DoneIcon from '@mui/icons-material/Done';

export default function TaskDoneCard() {

    let { doneCounter } = useContext(taskCounter);

  return (
    <div className='statistic-box tasks-counter'><DoneIcon style={{color: '#66bb6a'}} /> Tasks Done: {doneCounter}</div>
  )
}
