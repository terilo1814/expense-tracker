import { useState } from "react";
import { SignupAndLogin } from "./components/SignupAndLogin";
import { AppContext } from "./context/AppContext";
import { Route, useHistory } from "react-router-dom/cjs/react-router-dom";
import { Welcome } from "./components/Welcome";
import { Profile } from "./components/Profile";
import { ForgotPassword } from "./components/ForgotPassword";



function App() {

  const history = useHistory()
  const initialToken = localStorage.getItem('token')
  const initialEmail = localStorage.getItem('email')

  const [token, setToken] = useState(initialToken)
  const [emailId, setEmailId] = useState(initialEmail)

  const userLoggedIn = !!token

  const loginHandler = (data) => {
    setToken(data.idToken)
    localStorage.setItem('token', data.idToken)

    setEmailId(data.email)
    localStorage.setItem('email', data.email)
  }

  const logoutHandler = () => {
    setToken(null)
    localStorage.clear()
    history.push('/')
  }

  const contextValue = {
    token: token,
    isLoggedIn: userLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    userEmail: emailId
  }

  return (
    <>
      <AppContext.Provider value={{ contextValue }}>
        <Route exact path='/'>
          <SignupAndLogin />
        </Route>
        <Route exact path='/welcome'>
          <Welcome />
        </Route>
        <Route exact path='/profile'>
          <Profile />
        </Route>
        <Route excat path='/forgotPassword'>
          <ForgotPassword />
        </Route>
      </AppContext.Provider>
    </>
  );
}

export default App;
