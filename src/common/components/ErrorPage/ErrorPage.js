import React from 'react';
import './ErrorPage.css';
import '../../css/Buttoms/MenuButtoms/MenuButtoms.css';
import { useNavigate } from 'react-router-dom';


export default function ErrorPage() {

    const navigate = useNavigate();

  return (
    <div className='error-page'>
        <div className='error-page__content'>
            <h1>404</h1>
            <h2>Oops something wrong...</h2>
            <h5>🙏Please use the buttons below to return:</h5>
        </div>
        <div className='error-page__container'>
            <button className='btn errorPage-btn' onClick={() => navigate('/authorization')}>Authorization page</button>
            <button className='btn errorPage-btn' onClick={() => navigate('/dashboard')}>Return to Dashboard</button>
        </div>
    </div>
  )
}
