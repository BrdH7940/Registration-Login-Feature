import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator'

export function IsStrongPassword(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isStrongPassword',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') {
            return false
          }
          // At least 6 characters, contains at least one letter and one number
          const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/
          return strongPasswordRegex.test(value)
        },
        defaultMessage(args: ValidationArguments) {
          return 'Password must be at least 6 characters long and contain at least one letter and one number'
        },
      },
    })
  }
}

