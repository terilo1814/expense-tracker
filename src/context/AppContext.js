import { createContext } from "react";

export const AppContext = createContext({
    token: '',
    isLogggedIn: false,
    login: (token) => { },
    logout: () => { },
    emailId: '',
    setEmailid: () => { }

})