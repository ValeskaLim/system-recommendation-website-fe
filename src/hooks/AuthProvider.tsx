import axios from "axios";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import CommonConstant from "../constant/CommonConstant";

interface Users {
    user_id?: number;
    username: string;
    email: string;
    fullname: string;
    gender: string;
    semester: number;
    field_of_preference: string;
    major: string;
    role: string;
    is_verified: boolean;
}

interface AuthContextType {
    users: Users | null;
    login: (email: string, password: string) => Promise<void>; 
    logout: () => Promise<void>;
    isAuthenticated: boolean;
    refreshUser: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps)  => {
    const [users, setUser] = useState<Users | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    axios.defaults.withCredentials = true;

    const fetchUser = async () => {
        try {
            const res = await axios.post(CommonConstant.GetCurrentUser, {}, { withCredentials: true });
            if(res.data.user) {
                setUser(res.data.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.log('Error fetching user', error);
            setUser(null);
        }
    }

    useEffect(() => {
        fetchUser().finally(() => setLoading(false));
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post(CommonConstant.Login, { email, password }, { withCredentials: true });
            if (response.data.user) {
                setUser(response.data.user);
            } 

            setTimeout(() => {
                fetchUser();
            }, 100);

        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    const logout = async () => {
        try {
            await axios.post(CommonConstant.Logout, { withCredentials: true });
            setUser(null);
        } catch (err) {
            console.log("Logout failed", err);
        }
    };

    const value: AuthContextType = {
        users,
        login,
        logout,
        isAuthenticated: !!users,
        refreshUser: fetchUser,
        loading,
    };

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
};