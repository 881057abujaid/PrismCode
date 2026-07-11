import { createContext, useEffect, useState, useMemo } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    const isAuthenticated = Boolean(token);

    useEffect(() => {
        const storedToken = localStorage.getItem("auth_token");
        const storedUser = localStorage.getItem("auth_user");

        if (storedToken) {
            setToken(storedToken);
        }

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        setLoading(false);
    }, []);

    // Login
    const login = ({ user, token }) => {
        setUser(user);
        setToken(token);

        localStorage.setItem("auth_token", token);
        localStorage.setItem("auth_user", JSON.stringify(user));
    };

    const logout = () => {
        setUser(null);
        setToken(null);

        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
    };

    const updateUser = (updatedUser) => {
        setUser(updatedUser);

        localStorage.setItem("auth_user", JSON.stringify(updateUser));
    };

    const value = useMemo(() => ({
        user,
        token,
        loading,
        isAuthenticated,
        login,
        logout,
        updateUser,
    }), [user, token, loading]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;