import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { authActions } from "../store/AuthRedux";
import './SignupAndLogin.css'


export const SignupAndLogin = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const mail = useRef("");
    const password = useRef("");
    const confirmPassword = useRef("");

    const [isLogin, setIsLogin] = useState(false);


    const loginHandler = (data) => {
        dispatch(authActions.login({
            token: data.idToken,
            emailId: data.email
        }));

        localStorage.setItem('token', data.idToken);
        localStorage.setItem('email', data.email);
        history.push('/welcome');
    };


    const authHandler = (e) => {
        e.preventDefault();

        const enteredMail = mail.current?.value;
        const enteredPassword = password.current?.value;
        const enteredConfirmPassword = confirmPassword.current?.value;

        let url;
        if (isLogin) {
            if (enteredMail === "" || enteredPassword === "") {
                alert("Please fill in all the details");
                return;
            }
            url =
                "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCE9Ri0f_1n-d_Z-CFFDTIrtb1pk1NRfJQ";
        } else {
            if (enteredMail === "" || enteredPassword === "" || enteredConfirmPassword === "") {
                alert("Please fill in all the details");
                return;
            }
            if (enteredPassword !== enteredConfirmPassword) {
                alert("Passwords do not match.");
                return;
            }
            url =
                "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCE9Ri0f_1n-d_Z-CFFDTIrtb1pk1NRfJQ";
        }
        fetch(url,
            {
                method: "POST",
                body: JSON.stringify({
                    email: enteredMail,
                    password: enteredPassword,
                    returnSecureToken: true,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                if (res.ok) {
                    if (!isLogin) {
                        confirmPassword.current.value = "";
                    }
                    mail.current.value = "";
                    password.current.value = "";
                    return res.json();
                } else {
                    return res.json().then((data) => {
                        let errorMessage = "Authentication failed";
                        throw new Error(errorMessage);
                    });
                }
            })
            .then((data) => {
                loginHandler(data)
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    const toggleMode = () => {
        setIsLogin((prevState) => !prevState);
    };

    return (
        <>
            <form className="container">
                <h2>{isLogin ? "Login" : "SignUp"}</h2>
                <div className="mail-ui">
                    <label>Email</label>
                    <input type="text" placeholder="Email" ref={mail} />
                </div>
                <div className="pswd-ui">
                    <label>Password</label>
                    <input type="password" placeholder="Password" ref={password} />
                </div>

                {!isLogin && (
                    <div className="cnf-ui">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Confirm password"
                            ref={confirmPassword}
                        />
                    </div>
                )}

                <button className="auth-btn" onClick={authHandler}>
                    {isLogin ? "Login" : "Signup"}
                </button>

                {isLogin ? (
                    <>
                        <NavLink to="./forgotPassword">
                            <p>Forgot password</p>
                        </NavLink>
                        <NavLink to="./">
                            <button className="toggle-btn" onClick={toggleMode}>
                                Don't have an account?Sign up
                            </button>
                        </NavLink>
                    </>
                ) : (
                    <NavLink to="./">
                        <button className="toggle-btn " onClick={toggleMode}>
                            Already have an account? Login
                        </button>
                    </NavLink>
                )}
            </form>
        </>
    );
};
