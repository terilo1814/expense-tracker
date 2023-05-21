
import { SignupAndLogin } from "./components/SignupAndLogin";
import { Route} from "react-router-dom";
import { Welcome } from "./components/Welcome";
import { Profile } from "./components/Profile";
import { ForgotPassword } from "./components/ForgotPassword";
import {  useDispatch } from 'react-redux';
import { authActions } from "./store/AuthRedux";
import { useEffect } from "react";

function App() {
  
  const dispatch = useDispatch();

  const initialToken = localStorage.getItem('token');
  const initialEmail = localStorage.getItem('email');


  useEffect(() => {
    if (initialEmail && initialToken)
      dispatch(authActions.login({
        token: initialToken,
        emailId: initialEmail
      }))
  }, [])



  return (
    <>
      <Route exact path='/'>
        <SignupAndLogin />
      </Route>
      <Route exact path='/welcome'>
        <Welcome />
      </Route>
      <Route exact path='/profile'>
        <Profile />
      </Route>
      <Route exact path='/forgotPassword'>
        <ForgotPassword />
      </Route>
    </>
  );
}

export default App;
