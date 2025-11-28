import type { CSSProperties } from 'react'
import type { Variants } from 'framer-motion'

export const softEase = [0.25, 0.8, 0.25, 1] as const

export const containerVariants: Variants = {
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

export const floatVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: softEase },
    },
}

export const cardTextureStyle: CSSProperties = {
    backgroundImage:
        "linear-gradient(135deg, rgba(255,250,243,0.97), rgba(255,242,227,0.94)), url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' preserveAspectRatio='none'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/></filter><rect width='200' height='200' filter='url(%23n)' opacity='0.25'/></svg>\")",
    backgroundBlendMode: 'soft-light, normal',
    backgroundSize: 'cover, 200px',
    boxShadow:
        'inset 0 0 0 1px rgba(255, 255, 255, 0.65), 0 20px 40px rgba(90, 60, 40, 0.12)',
}

