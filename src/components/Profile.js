import React, { useContext, useEffect } from 'react';
import './Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { BsGlobe } from 'react-icons/bs';
import { useState } from 'react';
import { AppContext } from '../context/AppContext';



export const Profile = () => {

    const { contextValue } = useContext(AppContext)

    const [fullName, setFullName] = useState(contextValue.fullName);
    const [photoURL, setPhotoURL] = useState(contextValue.photoURL);

    const updateHandler = () => {
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCE9Ri0f_1n-d_Z-CFFDTIrtb1pk1NRfJQ'


        fetch(
            url,
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
            }).then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    return res.json().then(data => {
                        let errorMessage = 'Authentication failed'
                        throw new Error(errorMessage)
                    })
                }

            }).catch(err => {
                alert(err.message)
            })

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




    return (
        <>
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
            </div>

        </>
    )
}
