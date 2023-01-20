import React, { useState } from 'react';
import { auth } from '../../../../firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../../../../common/css/FormInputs/FormInputs.css';
import '../../../../common/css/Buttoms/TogglePasswordButtoms/TogglePasswordButtoms.css';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Register() {

  const navigate = useNavigate();

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [isShown, setIsSHown] = useState(false);

  const register = async (e) => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      )
      alert('Thank you for registration👋');
      e.preventDefault();
      alert('Here is your dashboard!😉');
      navigate('/dashboard')
    } catch (error) {
      alert(error.message);
    }
  };

  const togglePassword = () => {
    setIsSHown((isShown) => !isShown);
  };

  return (
    <div className='enter-form'>
    <input 
      placeholder="Email..." 
      onChange={(e) => {
        setRegisterEmail(e.target.value)}}
      className='enter-form__input'
    />
    <input
      placeholder="Password..."
      type={isShown ? "text" : "password"}
      onChange={(e) => {
        setRegisterPassword(e.target.value)}}
      className='enter-form__input'
    />
    <button 
          onClick={togglePassword} 
          className={isShown ? 
          'show-btn' : 
          'hide-btn'}
          >{ !isShown ? <VisibilityIcon /> : <VisibilityOffIcon />}</button>
    <button 
      onClick={register}
      className='btn enter-form__btn'
      >Submit</button>
  </div>
  )
}
