import { createContext, useState } from "react";
import type { User } from "../types/user.types";

interface AuthContextType {
    user : User | null;
    setUser : (user: User | null) => void;
};

export const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => {},
});

export const AuthProvider = ({children} : any) => {
    const [user, setUser] =useState<User | null>(null);

    return (
        <AuthContext.Provider value={{ user, setUser}}>
            {children}
        </AuthContext.Provider>
    );
};