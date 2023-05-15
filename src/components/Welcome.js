import React from 'react'
import './Welcome.css'
import { NavLink } from 'react-router-dom/cjs/react-router-dom'

export const Welcome = () => {
    return (
        <>
            <div className='ctn-group'>
                <h3>Welcome to Expense Tracker</h3>
                    <button className='profile-btn'>Your profile is incomplete.
                        <NavLink to='/profile'>Complete now</NavLink>
                    </button>
              
            </div>
        </>

    )
}
