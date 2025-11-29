import { motion } from 'framer-motion'
import type { UseFormRegisterReturn } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { softEase } from '@/lib/motion'

type FloatingLabelInputProps = {
    id: string
    label: string
    type?: string
    error?: string
    register: UseFormRegisterReturn
    isActive: boolean
    isFilled: boolean
    onFocusChange: (value: boolean) => void
    labelClassName?: string
    inputClassName?: string
}

export function FloatingLabelInput({
    id,
    label,
    type = 'text',
    error,
    register,
    isActive,
    isFilled,
    onFocusChange,
    labelClassName,
    inputClassName,
}: FloatingLabelInputProps) {
    return (
        <div className="space-y-1.5">
            <Label
                htmlFor={id}
                className={cn(
                    'pl-4 text-md font-semibold text-[#4a2c2a]',
                    labelClassName
                )}
            >
                {label}
            </Label>
            <div className="relative">
                <motion.label
                    htmlFor={id}
                    animate={
                        isFilled
                            ? { opacity: 0 }
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
                    {label}
                </motion.label>
                <Input
                    id={id}
                    type={type}
                    placeholder=" "
                    {...register}
                    onBlur={(event) => {
                        register.onBlur(event)
                        onFocusChange(false)
                    }}
                    onFocus={() => onFocusChange(true)}
                    className={cn(
                        'h-14 rounded-2xl border px-4 py-3 text-md text-[#4a3b32] placeholder-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] focus:ring-0 focus-visible:ring-0',
                        isActive
                            ? 'border-[#f59e0b] bg-[#fff4e6]'
                            : 'border-[#e8dcca] bg-white/95',
                        inputClassName
                    )}
                    aria-invalid={error ? 'true' : 'false'}
                />
            </div>
            {error && (
                <p className="text-md text-destructive" role="alert">
                    {error}
                </p>
            )}
        </div>
    )
}
