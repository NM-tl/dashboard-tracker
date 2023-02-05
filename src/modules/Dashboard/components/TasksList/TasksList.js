import React, { useState } from 'react';
import TaskItem from '../TaskItem/TaskItem';
import './TasksList.css';

export default function TasksList() {

  const [selectedFilter, setSelectedFilter] = useState('All');

  const handleSelectChange = (e) => {
    setSelectedFilter(e.target.value);
  }

  return (
    <div className="tasks-list">
      <div className='tasks-filter'>
        <h5>Filter by task priority: </h5>
        <select label="Filter by task priority" onChange={handleSelectChange}>
            <option value='All' selected>All</option>
            <option value='Low'>Low</option>
            <option value='Medium'>Medium</option>
            <option value='High'>High</option>
        </select>
      </div>
        <TaskItem value={selectedFilter} />
    </div>
  )
}