import React from 'react'
import './ForgotPassword.css'
import { useSelector} from 'react-redux'

export const ForgotPassword = () => {

    const userEmail = useSelector(state => state.auth.emailId)
   



    const linkHandler = async () => {
        try {
            const url = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCE9Ri0f_1n-d_Z-CFFDTIrtb1pk1NRfJQ'
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    requestType: "PASSWORD_RESET",
                    email: userEmail
                })
            })
            if (response.ok) {
                alert('Email verification link sent. Please check your email.');
            } else {
                throw new Error('Failed to verify email')
            }
        } catch (error) {
            alert('Failed to send the link.Try again after some time')
        }
    }


    return (
        <>
            <div className='pswd-container'>
                <label>Enter the email with which you have registererd</label>
                <input className='mail-cont' type='text' />
                <button className='link-btn' onClick={linkHandler}>Send Link</button>
            </div>
        </>
    )
}
