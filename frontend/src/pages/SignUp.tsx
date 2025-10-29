import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerUser } from '../services/userService'

const signUpSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})

type SignUpForm = z.infer<typeof signUpSchema>

export default function SignUp() {
    const navigate = useNavigate()
    const [showSuccess, setShowSuccess] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpForm>({
        resolver: zodResolver(signUpSchema),
    })

    const mutation = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            setShowSuccess(true)
            setTimeout(() => {
                navigate('/login')
            }, 2000)
        },
    })

    const onSubmit = (data: SignUpForm) => {
        mutation.mutate(data)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
                <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
                    Sign Up
                </h1>

                {showSuccess && (
                    <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                        Account created successfully! Redirecting to login...
                    </div>
                )}

                {mutation.isError && (
                    <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        {mutation.error instanceof Error
                            ? mutation.error.message
                            : 'Registration failed. Please try again.'}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            {...register('email')}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                            placeholder="Enter your email"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            {...register('password')}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                            placeholder="Enter your password"
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
                    >
                        {mutation.isPending ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <a href="/login" className="text-indigo-600 hover:text-indigo-800 font-semibold">
                            Log In
                        </a>
                    </p>
                    <p className="mt-2">
                        <a href="/" className="text-sm text-gray-500 hover:text-gray-700">
                            ← Back to Home
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

