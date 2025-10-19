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

            localStorage.setItem('logout', Date.now().toString());

            setUser(null);
        } catch (error) {
            throw error;
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

    useEffect(() => {
        fetchUser();

        const handleStorage = (e: StorageEvent) => {
            if (e.key === "logout") {
                setUser(null);
            }    
        };

        window.addEventListener('storage', (e) => handleStorage(e));

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

