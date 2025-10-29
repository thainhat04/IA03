import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export interface RegisterData {
    email: string
    password: string
}

export interface LoginData {
    email: string
    password: string
}

export interface LoginResponse {
    message: string
    token: string
}

export const registerUser = async (data: RegisterData) => {
    try {
        const response = await axios.post(`${API_URL}/user/register`, data)
        return response.data
    } catch (error: any) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message)
        }
        throw new Error('Registration failed. Please try again.')
    }
}

export const loginUser = async (data: LoginData): Promise<LoginResponse> => {
    try {
        const response = await axios.post<LoginResponse>(`${API_URL}/user/login`, data)
        return response.data
    } catch (error: any) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message)
        }
        throw new Error('Login failed. Please try again.')
    }
}

export const logoutUser = async (token: string) => {
    try {
        const response = await axios.post(`${API_URL}/user/logout`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error: any) {
        throw new Error('Logout failed. Please try again.')
    }
}