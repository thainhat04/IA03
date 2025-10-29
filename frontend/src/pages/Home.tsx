import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useMutation } from '@tanstack/react-query'
import { logoutUser } from '../services/userService'
import { useNavigate } from 'react-router-dom'
export default function Home() {
    const navigate = useNavigate()
    const { isAuthenticated, email, logout } = useAuth()
    const token = localStorage.getItem('token')

    const mutation = useMutation({
        mutationFn: () => logoutUser(token as string),
        onSuccess: () => {
            logout()
            navigate('/')
        },
    })

    if (isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
                    <h1 className="text-4xl font-bold text-gray-900 text-center mb-2">
                        Welcome Back!
                    </h1>
                    <p className="text-gray-600 text-center mb-4">
                        You are logged in as <strong>{email}</strong>
                    </p>
                    <div className="mt-8">
                        <button
                            onClick={() => mutation.mutate()}
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
                        >
                            Log Out
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
                <h1 className="text-4xl font-bold text-gray-900 text-center mb-2">
                    Welcome
                </h1>
                <p className="text-gray-600 text-center mb-8">
                    Get started by signing up or logging in
                </p>

                <div className="space-y-4">
                    <Link
                        to="/signup"
                        className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 text-center"
                    >
                        Sign Up
                    </Link>

                    <Link
                        to="/login"
                        className="block w-full bg-white border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold py-3 px-6 rounded-lg transition duration-200 text-center"
                    >
                        Log In
                    </Link>
                </div>
            </div>
        </div>
    )
}

