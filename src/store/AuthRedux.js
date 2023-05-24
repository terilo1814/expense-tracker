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
        },
    },
});

const themeState = { toggle: false };
const themeSlice = createSlice({
    name: "theme",
    initialState: themeState,
    reducers: {
        toggleTheme(state) {
            state.toggle = !state.toggle
        },
        toggleByValue(state, action) {
            state.toggle = action.payload
        }
    },
});

const rootReducer = {
    auth: authSlice.reducer,
    theme: themeSlice.reducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export const authActions = authSlice.actions;
export const themeActions = themeSlice.actions;
export default store;
