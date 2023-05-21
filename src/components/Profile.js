import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { BsGlobe } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store/AuthRedux';
import './Profile.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export const Profile = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const userEmail = useSelector(state => state.auth.emailId)

    const [fullName, setFullName] = useState("");
    const [photoURL, setPhotoURL] = useState("");


    const history = useHistory()
    const logoutHandler = () => {
        dispatch(authActions.logout());

        localStorage.removeItem('token');
        localStorage.removeItem('email');

        history.push('/');
    };

    const updateHandler = async () => {
        try {
            const url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCE9Ri0f_1n-d_Z-CFFDTIrtb1pk1NRfJQ';
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    idToken: token,
                    displayName: fullName,
                    photoUrl: photoURL,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                return response.json();
            } else {
                let errorMessage = 'Authentication failed';
                throw new Error(errorMessage);
            }
        } catch (error) {
            alert(error);
        }
    };

    const getProfileData = async () => {
        try {
            const url = 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCE9Ri0f_1n-d_Z-CFFDTIrtb1pk1NRfJQ';
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    idToken: token,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                const user = data.users.find((user) => user.email === userEmail);
                setFullName(user?.displayName);
                setPhotoURL(user?.photoUrl);
            } else {
                throw new Error('Failed to retrieve profile data');
            }
        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        if (token) {
            getProfileData();
        }
    }, [token]);



    const emailHandler = async () => {
        try {
            const url = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCE9Ri0f_1n-d_Z-CFFDTIrtb1pk1NRfJQ';
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    requestType: 'VERIFY_EMAIL',
                    idToken: token
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                alert('Email verification link sent. Please check your email.');
            } else {
                throw new Error('Failed to verify email');
            }
        } catch (error) {
            alert(error);
        }
    };



    return (
        <>
            <button className="logout-btn" onClick={logoutHandler}>
                Logout
                <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" />
            </button>

            <div className='cnt'>
                <h1>Contact Details</h1>
                {photoURL ? (
                    <img className='dis-photo' src={photoURL} alt='Profile' />
                ) : (
                    <FontAwesomeIcon className='dis-photo' icon={faUserCircle} />
                )}
                <div className='name'>
                    <FontAwesomeIcon icon={faUser} className='name-icon' />
                    <label>Full name</label>
                    <input type='text' value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div className='photo'>
                    <BsGlobe className='url-icon' />
                    <label>Profile Photo URL</label>
                    <input type='text' value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} />
                </div>
                <button className='update-btn' onClick={updateHandler}>
                    Update
                </button>
                <button className='cancel-btn'>Cancel</button>
                <br />
                <button className='email-btn' onClick={emailHandler}>
                    Verify email
                    <FontAwesomeIcon icon={faEnvelope} className='email-icon' />
                </button>
            </div>
        </>
    );
};
