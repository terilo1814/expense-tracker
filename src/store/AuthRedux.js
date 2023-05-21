import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
    token: "",
    isLoggedIn: false,
    emailId: "",

};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            state.token = action.payload.token;
            state.isLoggedIn = true;
            state.emailId = action.payload.emailId;
        },
        logout(state) {
            state.token = "";
            state.isLoggedIn = false;
            state.emailId = "";
        }
    }
});




const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    }
});

export const authActions = authSlice.actions;
export default store;
