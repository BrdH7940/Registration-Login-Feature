import axios, { type AxiosError } from 'axios'

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 seconds timeout
})

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // Add any auth tokens here if needed in the future
        // const token = localStorage.getItem('token')
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`
        // }
        return config
    },
    (error: AxiosError) => {
        return Promise.reject(error)
    }
)

// Response interceptor for better error handling
api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        // Handle network errors
        if (!error.response) {
            console.error('Network error:', error.message)
            return Promise.reject(
                new Error('Network error. Please check your connection.')
            )
        }

        // Handle specific status codes
        const status = error.response.status
        if (status === 401) {
            // Handle unauthorized - could redirect to login
            console.warn('Unauthorized request')
        } else if (status >= 500) {
            console.error('Server error:', error.response.data)
        }

        return Promise.reject(error)
    }
)

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

export interface LoginRequest {
    email: string
    password: string
}

export interface LoginResponse {
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
            if (axios.isAxiosError(error) && error.response) {
                // Extract error message from response
                const errorData = error.response.data as ApiError | string
                const errorMessage =
                    typeof errorData === 'string'
                        ? errorData
                        : (errorData as ApiError)?.message ||
                          error.message ||
                          'An error occurred during registration'

                // Throw as Error instance so React Query handles it properly
                const registerError = new Error(errorMessage) as Error & {
                    data?: ApiError
                }
                registerError.data = { message: errorMessage }
                throw registerError
            }
            const genericError = new Error(
                error instanceof Error
                    ? error.message
                    : 'An unexpected error occurred'
            )
            throw genericError
        }
    },
    login: async (data: LoginRequest): Promise<LoginResponse> => {
        try {
            const response = await api.post<LoginResponse>('/user/login', data)
            return response.data
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                // Extract error message from response
                const errorData = error.response.data as ApiError | string
                const errorMessage =
                    typeof errorData === 'string'
                        ? errorData
                        : (errorData as ApiError)?.message ||
                          error.message ||
                          'An error occurred during login'

                // Throw as Error instance so React Query handles it properly
                const loginError = new Error(errorMessage) as Error & {
                    data?: ApiError
                }
                loginError.data = { message: errorMessage }
                throw loginError
            }
            const genericError = new Error(
                error instanceof Error
                    ? error.message
                    : 'An unexpected error occurred'
            )
            throw genericError
        }
    },
}
