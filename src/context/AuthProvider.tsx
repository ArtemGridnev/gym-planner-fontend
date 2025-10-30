import { createContext, useContext, useEffect, useRef, useState } from "react"
import type { User } from "../types/user"
import { logout as logoutService } from "../services/authService";
import { getCurrentUser } from "../services/usersService";
import useUser from "../hooks/useUser";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    setUser: (user: User | null) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null)

export default function AuthProvider({ children } : { children: React.ReactNode }) {
    const { user, setUser } = useUser();
    const [loading, setLoading] = useState(true);

    const userRef = useRef<User | null>(null);

    useEffect(() => {
        userRef.current = user;
    }, [user]);

    const logout = async () => {
        try {
            await logoutService();

            setUser(null);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchUser = async () => {
        try {
            const user = await getCurrentUser();
          
            setUser(user);
        } catch (error) {
            console.error(error);
        }

        setLoading(false);
    };

    const handleStorage = (e: StorageEvent) => {
        if (e.key === "logout") {
            setUser(null);
        } else if (e.key === "login") {
            console.log('user', userRef, !userRef)

            if (!userRef.current) {
                fetchUser();
            }
        } 
    };

    useEffect(() => {
        fetchUser();

        window.addEventListener('storage', handleStorage);

        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    return (
        <AuthContext value={{ user, loading, setUser, logout }}>
            {children}
        </AuthContext>
    );
}

export function useAuthContext() {
    const context = useContext(AuthContext);

    if (!context) throw new Error("useAuthContext must be used inside AuthProvider");

    return context;
}

