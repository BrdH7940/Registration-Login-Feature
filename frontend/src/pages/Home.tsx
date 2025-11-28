import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import loginFoodImage from '@/assets/login-food.jfif'

const softEase = [0.25, 0.8, 0.25, 1] as const

export default function Home() {
    return (
        <div className="min-h-screen w-full bg-[#fdf7f0] flex items-center justify-center px-4 py-10">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: softEase }}
                className="grid w-full max-w-6xl grid-cols-1 md:grid-cols-2 rounded-[32px] border border-[#f5e3cf] bg-white/80 shadow-[0_35px_120px_-45px_rgba(110,69,35,0.65)] overflow-hidden"
            >
                {/* Left side - Title and Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: softEase, delay: 0.1 }}
                    className="flex flex-col justify-center gap-8 px-8 py-12 md:px-12 bg-linear-to-b from-[#fffaf3] via-[#fff3e3] to-[#fee7cf]"
                >
                    <div className="space-y-6">
                        <p className="uppercase tracking-[0.3em] text-xs text-[#b37246] font-semibold">
                            Restaurant Ordering System
                        </p>
                        <h1
                            className="text-4xl md:text-5xl font-semibold text-[#4b2b23] leading-tight"
                            style={{ fontFamily: '"Playfair Display", serif' }}
                        >
                            Welcome
                        </h1>
                        <p className="text-lg text-[#4a2c22]">
                            Create an account or log in to order
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <Button
                            asChild
                            size="lg"
                            className="w-full rounded-full bg-[#e88d37] text-[#4b2b23] text-lg font-bold shadow-[0_15px_35px_rgba(232,141,55,0.28)] border-none transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:bg-[#d67829] hover:shadow-[0_30px_55px_rgba(232,141,55,0.35)] hover:-translate-y-0.5 active:scale-[0.97] active:shadow-[inset_0_8px_16px_rgba(0,0,0,0.12)] focus-visible:translate-y-0"
                        >
                            <Link to="/login">Login</Link>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            className="w-full rounded-full border-2 border-[#4b2b23] bg-transparent text-[#4b2b23] text-base font-bold transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:bg-[#fceddb] hover:text-[#3a1f18] hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(74,43,35,0.15)] active:scale-[0.97] active:shadow-[inset_0_8px_16px_rgba(0,0,0,0.08)] focus-visible:ring-0 focus-visible:ring-offset-0"
                        >
                            <Link to="/signup">Sign Up</Link>
                        </Button>
                    </div>
                </motion.div>

                {/* Right side - Image */}
                <div className="hidden md:flex md:w-full relative bg-[#fff5ec]">
                    <motion.img
                        src={loginFoodImage}
                        alt="Warm brunch illustration"
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: softEase }}
                        className="w-full h-full object-cover"
                    />
                </div>
            </motion.div>
        </div>
    )
}
