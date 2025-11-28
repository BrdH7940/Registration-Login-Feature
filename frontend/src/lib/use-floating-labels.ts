import { useState } from 'react'
import type {
    FieldValues,
    Path,
    UseFormWatch,
} from 'react-hook-form'

type FocusState<TFieldValues extends FieldValues> = Record<
    Path<TFieldValues>,
    boolean
>

export function useFloatingLabels<TFieldValues extends FieldValues>(
    watch: UseFormWatch<TFieldValues>,
    fields: Path<TFieldValues>[]
) {
    const [focusedFields, setFocusedFields] = useState<
        FocusState<TFieldValues>
    >(() =>
        fields.reduce((acc, field) => {
            acc[field] = false
            return acc
        }, {} as FocusState<TFieldValues>)
    )

    const fieldValues = watch() as Record<Path<TFieldValues>, unknown>

    const isFieldFilled = (field: Path<TFieldValues>) =>
        Boolean(fieldValues[field])

    const getFieldActive = (field: Path<TFieldValues>) =>
        focusedFields[field] || isFieldFilled(field)

    const handleFocusChange = (field: Path<TFieldValues>, value: boolean) =>
        setFocusedFields((prev) => ({ ...prev, [field]: value }))

    return { isFieldFilled, getFieldActive, handleFocusChange }
}

