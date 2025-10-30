import { useState } from "react";
import type { User } from "../types/user";

export default function useUser() {
    const [user, setUserState] = useState<User | null>(null);

    const setUser = (user: User | null) => {
        setUserState(user)

        if (user) {
            localStorage.setItem('login', Date.now().toString());
        } else {
            localStorage.setItem('logout', Date.now().toString());
        }
    };

    return { user, setUser };
}