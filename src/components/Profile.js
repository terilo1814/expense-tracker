import React, { useContext, useEffect } from 'react';
import './Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope,faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { BsGlobe } from 'react-icons/bs';
import { useState } from 'react';
import { AppContext } from '../context/AppContext';



export const Profile = () => {

    const { contextValue } = useContext(AppContext)

    const [fullName, setFullName] = useState(contextValue.fullName);
    const [photoURL, setPhotoURL] = useState(contextValue.photoURL);

    const updateHandler = async () => {
        try {
            const url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCE9Ri0f_1n-d_Z-CFFDTIrtb1pk1NRfJQ'
            const response = await fetch(url,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        idToken: contextValue.token,
                        displayName: fullName,
                        photoUrl: photoURL,
                        returnSecureToken: true
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            if (response.ok) {
                return response.json()
            }
            else {
                const data = await response.json()
                let errorMessage = 'Authentication failed'
                throw new Error(errorMessage)
            }

        } catch (error) {
            alert(error)
        }
    }

    const getProfileData = async () => {
        try {
            const url = 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCE9Ri0f_1n-d_Z-CFFDTIrtb1pk1NRfJQ'
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    idToken: contextValue.token,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.ok) {
                const data = await response.json()
                const user = data.users.find((user) => user.email === contextValue.userEmail);
                setFullName(user?.displayName)
                setPhotoURL(user?.photoUrl)
            }
            else {
                throw new Error('Failed to retrieve profile data')
            }

        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        if (contextValue.token)
            getProfileData()
    }, [contextValue.token])


    const emailHandler = async () => {
        try {
            const url = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCE9Ri0f_1n-d_Z-CFFDTIrtb1pk1NRfJQ'
            const response = await fetch(url,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        requestType: "VERIFY_EMAIL",
                        idToken: contextValue.token
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            if (response.ok) {
                alert('Email verification link sent. Please check your email.');
            }
            else {
                throw new Error('Failed to verify email')
            }

        } catch (error) {
            alert(error)
        }

    }


    return (
        <>
        <button className="logout-btn" onClick={contextValue.logout}>
            Logout
            <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" />
          </button>
        
            <div className='cnt'>
              
                <h1>Contact Details</h1>

                <div className='name'>
                    <FontAwesomeIcon icon={faUser} className='name-icon' />
                    <label>Full name</label>
                    <input type='text' value={fullName} onChange={(e) => setFullName(e.target.value)} />

                </div>
                <div className='photo'>
                    < BsGlobe className='url-icon' />
                    <label>Profile Photo URL</label>
                    <input type='text' value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} />
                </div>
                <button className='update-btn' onClick={updateHandler}>Update</button>
                <button className='cancel-btn'>Cancel</button>
                <br></br>
                <button className='email-btn' onClick={emailHandler}>Verify email
                    <FontAwesomeIcon icon={faEnvelope} className='email-icon' />
                </button>
            </div>

        </>
    )
}
