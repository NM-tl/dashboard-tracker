import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import './Loader.css';

export default function Loader() {
  return (
    <div className='loader-bg'>
        <div className='loader-content'>
            <h1>Wait pls...</h1>
            <p>app is loading for you 🤍</p>
            <CircularProgress color="secondary" />
        </div>
    </div>
  )
}
