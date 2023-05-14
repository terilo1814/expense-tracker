import React, { useRef, useState } from 'react'
import './ExpenseForm.css'

export const ExpenseForm = () => {

    const mail = useRef('')
    const password = useRef('')
    const confirmPassword = useRef('')


    const [login, setLogin] = useState(false)

    const signupHandler = (e) => {
        e.preventDefault()

        const enteredMail = mail.current.value
        const enteredPassword = password.current.value
        const enteredConfirmPassword = confirmPassword.current.value

        let url
        if (login) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCE9Ri0f_1n-d_Z-CFFDTIrtb1pk1NRfJQ'
        }
        else {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCE9Ri0f_1n-d_Z-CFFDTIrtb1pk1NRfJQ'
        }
        fetch(
            url,
            {
                method: 'POST',
                body: JSON.stringify({
                    email: enteredMail,
                    password: enteredPassword,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                if (res.ok) {
                    console.log('Successfully Signed Up')
                    return res.json()

                } else {
                    return res.json().then(data => {
                        let errorMessage = 'Authentication failed'
                        throw new Error(errorMessage)
                    })
                }
            }).catch((err) => {
                alert(err.message)
            })


        if (enteredMail === '' || enteredPassword === '' || enteredConfirmPassword === '') {
            alert('Please fill in all the details')
            return
        }
        if (enteredPassword !== enteredConfirmPassword) {
            alert('Passwords do not match.');
            return;
        }
    }


    return (
        <>
            <form className='container'>
                <h2>SignUp</h2>
                <div className='mail-ui'>
                    <label>Email</label>
                    <input type='text'
                        placeholder='Email'
                        ref={mail} />
                </div>
                <div className='pswd-ui'>
                    <label>Password</label>
                    <input type='password'
                        placeholder='Password'
                        ref={password} />
                </div>
                <div className='cnf-ui'>
                    <label>Confirm Password</label>
                    <input type='password'
                        placeholder='Confirm password'
                        ref={confirmPassword} />
                </div>
                <button className='signup-btn' onClick={signupHandler}>Sign Up</button>
            </form>

        </>
    )
}
