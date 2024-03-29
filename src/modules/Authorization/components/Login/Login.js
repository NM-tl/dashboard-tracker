import React, { useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword 
} from 'firebase/auth';
import { auth } from '../../../../firebase-config';
import { useNavigate } from 'react-router-dom';
import './Login.css'
import '../../../../common/css/Buttoms/Buttoms.css'
import '../../../../common/css/FormInputs/FormInputs.css';
import '../../../../common/css/Buttoms/EnterButtoms/EnterButtoms.css';
import '../../../../common/css/Buttoms/TogglePasswordButtoms/TogglePasswordButtoms.css';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Login() {

  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});
  const [isShown, setIsSHown] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

}, [])

  const login = async (e) => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      )
      e.preventDefault();
      alert(`${user} Welcome to your Dashboard👋`);
      navigate('/dashboard')
    } catch (error) {
      alert(error.message)
    }
  };

  const togglePassword = () => {
    setIsSHown((isShown) => !isShown);
  };

  console.log(user)

  return (
    <div>
      <div className='enter-form'>
        <input
          placeholder="Email..."
          onChange={(e) => {
            setLoginEmail(e.target.value)}}
          className='enter-form__input'
        />
          <div className='row'>
            <input
            placeholder="Password..."
            type={isShown ? "text" : "password"}
            onChange={(e) => {
              setLoginPassword(e.target.value)}}
            className='enter-form__input show'
            />
            <button 
            id='show'
            onClick={togglePassword} 
            className={isShown ? 
            'show-btn' : 
            'hide-btn'}
            >{ !isShown ? <VisibilityIcon /> : <VisibilityOffIcon />}</button>
          </div>
          <button 
          onClick={login}
          className='btn enter-form__btn'
          > Login</button>
      </div>
    </div>  
  )
}