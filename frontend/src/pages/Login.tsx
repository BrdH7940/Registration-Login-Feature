import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowLeft, CheckCircle2, Coffee } from 'lucide-react'
import { FloatingLabelInput } from '@/components/auth/FloatingLabelInput'
import {
    cardTextureStyle,
    containerVariants,
    floatVariants,
} from '@/lib/motion'
import { useFloatingLabels } from '@/lib/use-floating-labels'

const loginSchema = z.object({
    email: z
        .string()
        .email('Please enter a valid email address')
        .min(1, 'Email is required'),
    password: z.string().min(1, 'Password is required'),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function Login() {
    const location = useLocation()
    const message = location.state?.message

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    })
    const { getFieldActive, isFieldFilled, handleFocusChange } =
        useFloatingLabels(watch, ['email', 'password'])

    const onSubmit = (data: LoginFormData) => {
        // Mock login - simulate success after 1 second
        console.log('Login attempt:', data)

        // Simulate API call
        setTimeout(() => {
            alert(
                'Login successful! (This is a mock - backend not implemented)'
            )
            // In a real app, you would navigate to a dashboard or protected route
            // navigate('/dashboard')
        }, 1000)
    }

    // Clear location state message after component mounts
    useEffect(() => {
        if (message) {
            // Clear the message from location state
            window.history.replaceState({}, document.title)
        }
    }, [message])

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
                                        duration: 2.8,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}
                                >
                                    <Coffee className="h-8 w-8" />
                                </motion.div>
                                <CardTitle className="font-['Playfair_Display'] text-3xl font-semibold text-[#4a2c2a] sm:text-4xl">
                                    Welcome back
                                </CardTitle>
                            </motion.div>
                            <CardContent className="space-y-8 p-0">
                                {message && (
                                    <motion.div variants={floatVariants}>
                                        <Alert variant="success">
                                            <CheckCircle2 className="h-4 w-4" />
                                            <AlertDescription>
                                                {message}
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
                                        <FloatingLabelInput
                                            id="email"
                                            label="Email"
                                            type="email"
                                            register={register('email')}
                                            error={errors.email?.message}
                                            isActive={getFieldActive('email')}
                                            isFilled={isFieldFilled('email')}
                                            onFocusChange={(value) =>
                                                handleFocusChange(
                                                    'email',
                                                    value
                                                )
                                            }
                                            labelClassName="text-lg"
                                        />

                                        <FloatingLabelInput
                                            id="password"
                                            label="Password"
                                            type="password"
                                            register={register('password')}
                                            error={errors.password?.message}
                                            isActive={getFieldActive(
                                                'password'
                                            )}
                                            isFilled={isFieldFilled('password')}
                                            onFocusChange={(value) =>
                                                handleFocusChange(
                                                    'password',
                                                    value
                                                )
                                            }
                                            labelClassName="text-lg"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full rounded-full bg-[#f59e0b] py-3 text-lg font-semibold text-white shadow-[0_12px_30px_rgba(223,138,23,0.35)] transition-transform duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:bg-[#dd7a06] hover:-translate-y-0.5 hover:shadow-[0_25px_45px_rgba(223,138,23,0.45)] active:scale-[0.94] active:shadow-[inset_0_12px_24px_rgba(0,0,0,0.18)]"
                                    >
                                        Log In
                                    </Button>
                                </motion.form>

                                <motion.div
                                    className="text-center text-md text-[#6a413c]"
                                    variants={floatVariants}
                                >
                                    Don't have an account?{' '}
                                    <motion.span whileHover={{ x: 3 }}>
                                        <Link
                                            to="/signup"
                                            className="font-semibold text-[#c86b0d] underline-offset-4 hover:underline"
                                        >
                                            Sign up
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
