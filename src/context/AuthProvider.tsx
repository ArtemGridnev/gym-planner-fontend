import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "../types/user"
import { logout as logoutService } from "../services/authService";
import { getCurrentUser } from "../services/usersService";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    user: User | null;
    loading: boolean,
    setUser: (user: User | null) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null)

export default function AuthProvider({ children } : { children: React.ReactNode }) {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const logout = async () => {
        try {
            await logoutService();

            setUser(null);

            navigate('/login');
        } catch (error) {
            throw error;
        }
    };

    const fetchUser = async () => {
        try {
            const user = await getCurrentUser();
          
            console.log('user', user);

            setUser(user);
        } catch (error) {
            console.error(error);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchUser();
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

