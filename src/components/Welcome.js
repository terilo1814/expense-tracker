import React, { useContext, useRef, useState } from 'react'
import './Welcome.css'
import { NavLink } from 'react-router-dom/cjs/react-router-dom'
import { AppContext } from '../context/AppContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

export const Welcome = () => {

    const { contextValue } = useContext(AppContext)
    const [data, setDataList] = useState([])

    const priceRef = useRef('')
    const descRef = useRef('')
    const categoryRef = useRef('')
    const dateRef = useRef('')


    const addHandler = (e) => {
        e.preventDefault()


        const newData = {
            enteredPrice: priceRef.current.value,
            enteredDesc: descRef.current.value,
            enteredCategory: categoryRef.current.value,
            enteredDate: dateRef.current.value
        }
        setDataList((prevData) => [...prevData, newData])

        priceRef.current.value = '';
        descRef.current.value = '';
        categoryRef.current.value = '';
        dateRef.current.value = '';

    }
    return (
        <>
            <div className='ctn-group'>
                <h3>Welcome to Expense Tracker</h3>
                <button className='profile-btn'>
                    <NavLink to='/profile' className='upd-profile'>Update Profile</NavLink>
                </button>
                <button className="logout-btn" onClick={contextValue.logout}>
                    Logout
                    <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" />
                </button>
            </div>
            <form className='container-ui'>
                <div className='price-ui'>
                    <label>Price</label>
                    <input type='number'
                        ref={priceRef}
                    />
                </div>
                <div className='desc-ui'>
                    <label>Description</label>
                    <input type='text'
                        ref={descRef}
                    />
                </div>
                <div className='category-ui'>
                    <label>Category</label>
                    <select className='ctg-label' ref={categoryRef}>
                        <option value="Petrol">Petrol</option>
                        <option value="Food">Food</option>
                        <option value="Salary">Salary</option>
                        <option value="Other Expense">Other Expense</option>
                    </select>
                </div>
                <div className='date-ui'>
                    <label>Date of expense</label>
                    <input type='date'
                        ref={dateRef}
                    />
                </div>
                <button onClick={addHandler} className='expense-btn'>Add Expense</button>
            </form>
            {data.map((item, index) => (
                <div key={index} className='expense-def'>
                    <span>Price: {item.enteredPrice}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span>Description: {item.enteredDesc}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span>Category: {item.enteredCategory}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span>Date: {item.enteredDate}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </div>
            ))}
        </>

    )
}
