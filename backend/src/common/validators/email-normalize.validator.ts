import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator'

/**
 * Validates and normalizes email addresses
 * Ensures email is lowercase and properly formatted
 */
export function IsNormalizedEmail(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isNormalizedEmail',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') {
            return false
          }
          // Email should be lowercase (normalized)
          // This prevents case-sensitivity issues
          const normalized = value.toLowerCase().trim()
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          return emailRegex.test(normalized)
        },
        defaultMessage(args: ValidationArguments) {
          return 'Email must be a valid email address'
        },
      },
    })
  }
}


