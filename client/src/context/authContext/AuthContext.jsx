import { createContext, useEffect, useReducer } from "react";
import CryptoJS from "crypto-js";
import AuthReducer from "./AuthReducer";
import { getUser } from "../../utils/action";

const INITIAL_STATE = {
    user: getUser(),
    loading: false,
    error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    // useEffect(() => {
    //     localStorage.setItem("user", JSON.stringify(state.user));
    // }, [state.user]);
    useEffect(() => {
        if (state.user != null) {
            const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify(state.user), import.meta.env.VITE_APP_SECRET_KEY).toString();
            localStorage.setItem("user", encryptedUser);
        } else {
            localStorage.setItem("user", null);
        }
    }, [state.user]);

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                loading: state.loading,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};