import React, { useState, useEffect } from 'react';
import DashboardHeader from '../Dashboard/components/DashboardHeader/DashboardHeader';
import DashboardSidebar from '../Dashboard/components/DashboardSidebar/DashboardSidebar';
import './UserProfile.css'
import { UserAuth } from '../../context/AuthContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import './../../common/css/Buttoms/ChangeButtoms/ChangeButtoms.css'

import { updateProfile, sendPasswordResetEmail, getAuth } from "firebase/auth";
import { upload } from "../../firebase-config";

export default function UserProfile() {

    const { user } = UserAuth();
    const auth = getAuth();

    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);
    const [photoURL, setPhotoURL] = useState(<AccountCircleIcon style={{ width: '64px', height: '64px' }} />);

    const changeNameHandler = () => {
        let name = prompt('👇Write new Name:')
        return updateProfile(user, {
            displayName: name,
        }).then(() => {
            alert('Well done!👌');
        }).catch((error) => {
            alert('Error:' + error);
        });
    }

    const changePasswordHandler = () => {
        sendPasswordResetEmail(auth, user.email)
            .then(() => {
                alert('We send on your e-mail link, for reset password. Chek it pls!👌');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode + errorMessage);
        });
    }

    const changeAvatarHandle = (e) => {
        if (e.target.files[0]) {
        setPhoto(e.target.files[0])
        }
    }

    const updateAvatarHandle = () => {
        upload(photo, user, setLoading);
        alert('Well done!👌');
    }

    useEffect(() => {
        if (user?.photoURL) {
        setPhotoURL(user.photoURL);
        }
    }, [user])

  return (
    <div className='page'>
        <div className='dashboard'>
        <div className='dashboard-wrapper'>
            <DashboardSidebar />
        <div className='mainHalf'>
            <DashboardHeader />
            <div className='container profile'> 
                <div className='user-info'>
                    <div className='user-info__avatar'>
                    
                        <div class="avatar-border">
                            {
                            !photoURL ? 
                            <AccountCircleIcon style={{ width: '64px', height: '64px' }} /> :
                            <img src={photoURL} alt="Avatar" className="avatar" />
                            }
                            
                        </div>
                        <input type="file" onChange={changeAvatarHandle}  className='file'/>
                        <button hidden={loading || !photo} onClick={updateAvatarHandle} className='save'>Save</button>   
                    </div>
                    <div className='user-info__name'>
                        Name: {
                            !user.displayName ? user.email : user.displayName
                        }
                        <button className='changeButtom' onClick={changeNameHandler}><EditIcon style={{ width: '15px', height: '15px' }}/>Change Name</button>
                    </div>
                    <div className='user-info__email'>
                        Email: {user.email}
                    </div>
                    <button className='resetButtom' onClick={changePasswordHandler}><EditIcon style={{ width: '15px', height: '15px' }}/>Change Password</button>
                </div>
            </div>
        </div>  
        </div>
        </div>
    </div> 
  )
}