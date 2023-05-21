import React, { useEffect, useRef, useState } from 'react';
import './Welcome.css';
import { NavLink, useHistory } from 'react-router-dom/cjs/react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { authActions } from '../store/AuthRedux';
import { useDispatch } from 'react-redux';

export const Welcome = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(authActions.logout());
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        history.push('/');
    };

    const [data, setDataList] = useState([]);
    const [editExpense, setEditExpense] = useState(null);

    const priceRef = useRef('');
    const descRef = useRef('');
    const categoryRef = useRef('');
    const dateRef = useRef('');

    const addHandler = async (e) => {
        e.preventDefault();
        if (
            !priceRef.current.value ||
            !descRef.current.value ||
            !categoryRef.current.value ||
            !dateRef.current.value
        ) {
            alert('Please fill out all the details');
            return;
        }
        try {
            if (editExpense) {
                updateData();
            } else {
                postData();
            }
        } catch (error) {
            alert('Something went wrong');
        }
    };

    const postData = async () => {
        try {
            const url = 'https://expense-tracker-37a8e-default-rtdb.firebaseio.com/expenses.json';
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    enteredPrice: priceRef.current.value,
                    enteredDesc: descRef.current.value,
                    enteredCategory: categoryRef.current.value,
                    enteredDate: dateRef.current.value,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                const newData = {
                    name: data.name,
                    enteredPrice: priceRef.current.value,
                    enteredDesc: descRef.current.value,
                    enteredCategory: categoryRef.current.value,
                    enteredDate: dateRef.current.value,
                };
                setDataList((prevData) => [...prevData, newData]);

                priceRef.current.value = '';
                descRef.current.value = '';
                categoryRef.current.value = '';
                dateRef.current.value = '';
            } else {
                let errorMessage = 'Something went wrong';
                throw new Error(errorMessage);
            }
        } catch (error) {
            alert(error);
        }
    };

    const fetchData = async () => {
        try {
            const url = 'https://expense-tracker-37a8e-default-rtdb.firebaseio.com/expenses.json';
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                if (data) {
                    const expensesData = Object.keys(data).map((key) => ({
                        name: key,
                        ...data[key],
                    }));
                    setDataList(expensesData);
                }
            } else {
                const errorMessage = 'Failed to fetch expenses';
                throw new Error(errorMessage);
            }
        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const deleteHandler = async (id) => {
        try {
            const expenseId = data[id].name;
            const url = `https://expense-tracker-37a8e-default-rtdb.firebaseio.com/expenses/${expenseId}.json`;
            const response = await fetch(url, {
                method: 'DELETE',
            });
            if (response.ok) {
                setDataList((prevData) => prevData.filter((item) => item.name !== expenseId));
            } else {
                let errorMessage = 'Failed to delete expense';
                throw new Error(errorMessage);
            }
        } catch (error) {
            alert(error);
        }
    };

    const editHandler = (id) => {
        setEditExpense(data[id].name);
        priceRef.current.value = data[id].enteredPrice;
        descRef.current.value = data[id].enteredDesc;
        categoryRef.current.value = data[id].enteredCategory;
        dateRef.current.value = data[id].enteredDate;
    };

    const updateData = async () => {
        try {
            const url = `https://expense-tracker-37a8e-default-rtdb.firebaseio.com/expenses/${editExpense}.json`;
            const response = await fetch(url, {
                method: 'PUT',
                body: JSON.stringify({
                    enteredPrice: priceRef.current.value,
                    enteredDesc: descRef.current.value,
                    enteredCategory: categoryRef.current.value,
                    enteredDate: dateRef.current.value,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const newData = {
                    name: editExpense,
                    enteredPrice: priceRef.current.value,
                    enteredDesc: descRef.current.value,
                    enteredCategory: categoryRef.current.value,
                    enteredDate: dateRef.current.value,
                };
                setDataList((prevData) =>
                    prevData.map((item) => (item.name === editExpense ? newData : item))
                );

                setEditExpense(null);

                priceRef.current.value = '';
                descRef.current.value = '';
                categoryRef.current.value = '';
                dateRef.current.value = '';
            } else {
                let errorMessage = 'Failed to update expense';
                throw new Error(errorMessage);
            }
        } catch (error) {
            alert(error);
        }
    };

    const totalExpenses = data.reduce((total, item) => total + Number(item.enteredPrice), 0);

    return (
        <>
            <div className="ctn-group">
                <h3>Welcome to Expense Tracker</h3>
                <button className="profile-btn">
                    <NavLink to="/profile" className="upd-profile">
                        Update Profile
                    </NavLink>
                </button>
                <button className="logout-btn" onClick={logoutHandler}>
                    Logout
                    <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" />
                </button>
            </div>
            <form className="container-ui">
                <div className="price-ui">
                    <label>Price</label>
                    <input type="number" ref={priceRef} />
                </div>
                <div className="desc-ui">
                    <label>Description</label>
                    <input type="text" ref={descRef} />
                </div>
                <div className="category-ui">
                    <label>Category</label>
                    <select className="ctg-label" ref={categoryRef}>
                        <option value="Petrol">Petrol</option>
                        <option value="Food">Food</option>
                        <option value="Salary">Salary</option>
                        <option value="Other Expense">Other Expense</option>
                    </select>
                </div>
                <div className="date-ui">
                    <label>Date of expense</label>
                    <input type="date" ref={dateRef} />
                </div>
                <button onClick={addHandler} className="expense-btn">
                    Add Expense
                </button>
            </form>

            {totalExpenses > 10000 && (
                <button className="premium-btn">Activate Premium</button>
            )}

            {data.map((item, index) => (
                <div key={index} className="expense-def">
                    <span className="price-w">Price: {item.enteredPrice}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span className="desc-w">Description: {item.enteredDesc}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span className="ctg-w">Category: {item.enteredCategory}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span className="date-w">Date: {item.enteredDate}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <button onClick={() => editHandler(index)} className="edit-btn">
                        Edit Expense
                    </button>
                    <button onClick={() => deleteHandler(index)} className="delete-btn">
                        Delete Expense
                    </button>
                </div>
            ))}
        </>
    );
};
