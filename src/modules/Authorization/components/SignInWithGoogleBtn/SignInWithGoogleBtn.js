import React, { useEffect } from 'react'
import { UserAuth } from '../../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function SignInWithGoogleBtn() {

  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <>
        <button className="login-with-google-btn" onClick={handleGoogleSignIn}>Sign in with google</button>
    </>
  )
}