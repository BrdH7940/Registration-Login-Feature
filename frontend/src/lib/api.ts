import axios from 'axios'

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export interface RegisterRequest {
    email: string
    password: string
}

export interface RegisterResponse {
    message: string
    user?: {
        email: string
        createdAt: string
    }
}

export interface ApiError {
    message: string
    error?: string
}

export const userApi = {
    register: async (data: RegisterRequest): Promise<RegisterResponse> => {
        try {
            const response = await api.post<RegisterResponse>(
                '/user/register',
                data
            )
            return response.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const apiError: ApiError = error.response?.data || {
                    message:
                        error.response?.data?.message ||
                        error.message ||
                        'An error occurred during registration',
                }
                throw apiError
            }
            throw { message: 'An unexpected error occurred' }
        }
    },
}
