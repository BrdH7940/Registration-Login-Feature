import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { useState, type CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { userApi } from '@/lib/api'
import {
    CheckCircle2,
    AlertCircle,
    Loader2,
    ArrowLeft,
    Leaf,
} from 'lucide-react'

const softEase = [0.25, 0.8, 0.25, 1] as const
const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.9,
            ease: softEase,
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
}
const floatVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: softEase },
    },
}

const cardTextureStyle: CSSProperties = {
    backgroundImage:
        "linear-gradient(135deg, rgba(255,250,243,0.97), rgba(255,242,227,0.94)), url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' preserveAspectRatio='none'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/></filter><rect width='200' height='200' filter='url(%23n)' opacity='0.25'/></svg>\")",
    backgroundBlendMode: 'soft-light, normal',
    backgroundSize: 'cover, 200px',
    boxShadow:
        'inset 0 0 0 1px rgba(255, 255, 255, 0.65), 0 20px 40px rgba(90, 60, 40, 0.12)',
}

const signUpSchema = z.object({
    email: z
        .string()
        .email('Please enter a valid email address')
        .min(1, 'Email is required'),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .min(1, 'Password is required'),
})

type SignUpFormData = z.infer<typeof signUpSchema>

type ApiError = {
    message: string
    error?: string
}

export default function SignUp() {
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
    })
    const [focusedField, setFocusedField] = useState({
        email: false,
        password: false,
    })
    const fieldValues = watch()
    const getFieldActive = (field: keyof SignUpFormData) =>
        focusedField[field] || Boolean(fieldValues[field])
    const isFieldFilled = (field: keyof SignUpFormData) =>
        Boolean(fieldValues[field])
    const handleFocus = (field: keyof SignUpFormData, value: boolean) =>
        setFocusedField((prev) => ({ ...prev, [field]: value }))

    const mutation = useMutation({
        mutationFn: userApi.register,
        onSuccess: () => {
            setTimeout(() => {
                navigate('/login', {
                    state: {
                        message: 'Registration successful! Please log in.',
                    },
                })
            }, 2000)
        },
    })

    const onSubmit = (data: SignUpFormData) => {
        mutation.mutate(data)
    }

    const getErrorMessage = () => {
        if (!mutation.error) return null

        if (mutation.error instanceof Error) {
            return mutation.error.message
        }

        const apiError = mutation.error as ApiError
        return (
            apiError.message ||
            apiError.error ||
            'An error occurred during registration'
        )
    }

    const errorMessage = getErrorMessage()

    return (
        <div className="min-h-screen w-full bg-[#fef8ee] relative overflow-hidden text-[#4a2c2a]">
            <div className="absolute inset-0 bg-linear-to-br from-[#fff1dc] via-[#ffe8cc] to-[#ffd7ba]" />
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/40 blur-3xl" />
            <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-[#ffd9ba]/50 blur-3xl" />

            <motion.div
                className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8"
                initial="hidden"
                animate="show"
                variants={containerVariants}
            >
                <motion.div
                    variants={floatVariants}
                    className="w-full max-w-3xl"
                >
                    <Card
                        className="relative w-full overflow-hidden border-[#f5dfc7] bg-[#fffaf3]/95 backdrop-blur"
                        style={cardTextureStyle}
                    >
                        <motion.div
                            className="flex flex-col gap-10 p-6 sm:p-10 md:p-12"
                            variants={{
                                hidden: {},
                                show: {
                                    transition: {
                                        staggerChildren: 0.1,
                                        delayChildren: 0.1,
                                    },
                                },
                            }}
                        >
                            <motion.div
                                className="space-y-4 text-center"
                                variants={floatVariants}
                            >
                                <motion.div
                                    className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fde1c5] text-[#c86b0d]"
                                    animate={{ y: [0, -6, 0] }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}
                                >
                                    <Leaf className="h-8 w-8" />
                                </motion.div>
                                <CardTitle className="font-['Playfair_Display'] text-3xl font-semibold text-[#4a2c2a] sm:text-4xl">
                                    Create an account
                                </CardTitle>
                            </motion.div>
                            <CardContent className="space-y-8 p-0">
                                {mutation.isSuccess && (
                                    <motion.div variants={floatVariants}>
                                        <Alert variant="success">
                                            <CheckCircle2 className="h-4 w-4" />
                                            <AlertDescription>
                                                Account created successfully!
                                                Redirecting to login...
                                            </AlertDescription>
                                        </Alert>
                                    </motion.div>
                                )}

                                {errorMessage && (
                                    <motion.div variants={floatVariants}>
                                        <Alert variant="destructive">
                                            <AlertCircle className="h-4 w-4" />
                                            <AlertDescription>
                                                {errorMessage}
                                            </AlertDescription>
                                        </Alert>
                                    </motion.div>
                                )}

                                <motion.form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="space-y-6"
                                    variants={floatVariants}
                                >
                                    <div className="space-y-8">
                                        <div className="space-y-1.5">
                                            <Label
                                                htmlFor="email"
                                                className="pl-4 text-md font-semibold text-[#4a2c2a]"
                                            >
                                                Email
                                            </Label>
                                            <div className="relative">
                                                <motion.label
                                                    htmlFor="email"
                                                    animate={
                                                        isFieldFilled('email')
                                                            ? {
                                                                  opacity: 0,
                                                              }
                                                            : {
                                                                  scale: 1,
                                                                  color: '#b0a695',
                                                              }
                                                    }
                                                    transition={{
                                                        duration: 0.35,
                                                        ease: softEase,
                                                    }}
                                                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-semibold"
                                                >
                                                    Email address
                                                </motion.label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder=" "
                                                    {...register('email')}
                                                    onFocus={() =>
                                                        handleFocus(
                                                            'email',
                                                            true
                                                        )
                                                    }
                                                    onBlur={() =>
                                                        handleFocus(
                                                            'email',
                                                            false
                                                        )
                                                    }
                                                    className={`h-14 rounded-2xl border px-4 py-3 text-md text-[#4a3b32] placeholder-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] focus:ring-0 focus-visible:ring-0 ${
                                                        getFieldActive('email')
                                                            ? 'border-[#f59e0b] bg-[#fff4e6]'
                                                            : 'border-[#e8dcca] bg-white/95'
                                                    }`}
                                                    aria-invalid={
                                                        errors.email
                                                            ? 'true'
                                                            : 'false'
                                                    }
                                                />
                                            </div>
                                            {errors.email && (
                                                <p
                                                    className="text-md text-destructive"
                                                    role="alert"
                                                >
                                                    {errors.email.message}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label
                                                htmlFor="password"
                                                className="pl-4 text-md font-semibold text-[#4a2c2a]"
                                            >
                                                Password
                                            </Label>
                                            <div className="relative">
                                                <motion.label
                                                    htmlFor="password"
                                                    animate={
                                                        isFieldFilled(
                                                            'password'
                                                        )
                                                            ? {
                                                                  opacity: 0,
                                                              }
                                                            : {
                                                                  scale: 1,
                                                                  color: '#b0a695',
                                                              }
                                                    }
                                                    transition={{
                                                        duration: 0.35,
                                                        ease: softEase,
                                                    }}
                                                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-semibold"
                                                >
                                                    Password
                                                </motion.label>
                                                <Input
                                                    id="password"
                                                    type="password"
                                                    placeholder=" "
                                                    {...register('password')}
                                                    onFocus={() =>
                                                        handleFocus(
                                                            'password',
                                                            true
                                                        )
                                                    }
                                                    onBlur={() =>
                                                        handleFocus(
                                                            'password',
                                                            false
                                                        )
                                                    }
                                                    className={`h-14 rounded-2xl border px-4 py-3 text-lg text-[#4a3b32] placeholder-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] focus:ring-0 focus-visible:ring-0 ${
                                                        getFieldActive(
                                                            'password'
                                                        )
                                                            ? 'border-[#f59e0b] bg-[#fff4e6]'
                                                            : 'border-[#e8dcca] bg-white/95'
                                                    }`}
                                                    aria-invalid={
                                                        errors.password
                                                            ? 'true'
                                                            : 'false'
                                                    }
                                                />
                                            </div>
                                            {errors.password && (
                                                <p
                                                    className="text-md text-destructive"
                                                    role="alert"
                                                >
                                                    {errors.password.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full rounded-full bg-[#f59e0b] py-3 text-base font-semibold text-white shadow-[0_12px_30px_rgba(223,138,23,0.35)] transition-transform duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:bg-[#dd7a06] hover:-translate-y-0.5 hover:shadow-[0_25px_45px_rgba(223,138,23,0.45)] active:scale-[0.94] active:shadow-[inset_0_12px_24px_rgba(0,0,0,0.18)]"
                                        disabled={mutation.isPending}
                                    >
                                        {mutation.isPending && (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        {mutation.isPending
                                            ? 'Creating account...'
                                            : 'Sign Up'}
                                    </Button>
                                </motion.form>

                                <motion.div
                                    className="text-center text-md text-[#6a413c]"
                                    variants={floatVariants}
                                >
                                    Already have an account?{' '}
                                    <motion.span whileHover={{ x: 3 }}>
                                        <Link
                                            to="/login"
                                            className="font-semibold text-[#c86b0d] underline-offset-4 hover:underline"
                                        >
                                            Log in
                                        </Link>
                                    </motion.span>
                                </motion.div>

                                <motion.div
                                    className="text-center"
                                    variants={floatVariants}
                                >
                                    <Link
                                        to="/"
                                        className="inline-flex items-center justify-center gap-1 text-md font-semibold text-[#4a2c2a] transition-colors hover:text-[#a4511d]"
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                        Back to home
                                    </Link>
                                </motion.div>
                            </CardContent>
                        </motion.div>
                    </Card>
                </motion.div>
            </motion.div>
        </div>
    )
}
