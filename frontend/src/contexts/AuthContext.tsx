import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AuthContextType {
    token: string | null
    email: string | null
    login: (token: string, email: string) => void
    logout: () => void
    isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)

    useEffect(() => {
        // Load auth state from localStorage on mount
        const storedToken = localStorage.getItem('token')
        const storedEmail = localStorage.getItem('email')
        if (storedToken && storedEmail) {
            setToken(storedToken)
            setEmail(storedEmail)
        }
    }, [])

    const login = (newToken: string, userEmail: string) => {
        setToken(newToken)
        setEmail(userEmail)
        localStorage.setItem('token', newToken)
        localStorage.setItem('email', userEmail)
    }

    const logout = () => {
        setToken(null)
        setEmail(null)
        localStorage.removeItem('token')
        localStorage.removeItem('email')
    }

    return (
        <AuthContext.Provider value={{ token, email, login, logout, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}

