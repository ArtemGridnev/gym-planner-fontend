import { useState } from "react";
import { login } from "../services/authService";
import { useAuthContext } from "../context/AuthProvider";

export default function useLogin() {
    const { setUser } = useAuthContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        setSuccess(null);
        setError(null);

        try {
            const data = await login(email, password);
            
            setUser(data.user);

            setSuccess('Logged in successfully!');
        } catch (err: any) {
            setPassword("");

            setError(err.message || "Login failed");
        }

        setLoading(false);
    };

    return ({
        email,
        setEmail,
        password,
        setPassword,
        loading,
        success,
        error,
        handleSubmit
    });
}