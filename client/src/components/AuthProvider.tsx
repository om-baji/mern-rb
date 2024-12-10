import React, { createContext, useContext, useEffect, useState } from "react";

type AuthProviderProps = {
    children : React.ReactNode
}

type AuthContextType = {
    isAuthenticated : boolean | null
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated : null
})

export function AuthProvider({ children }: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        setIsAuthenticated(!!token);
        setIsLoading(false); 
    }, []);

    if (isLoading) {
    
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
};

