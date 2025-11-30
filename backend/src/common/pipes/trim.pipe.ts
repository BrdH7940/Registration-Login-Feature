import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common'

/**
 * Trim pipe to remove whitespace from string values
 * This helps prevent issues with accidental spaces in user input
 */
@Injectable()
export class TrimPipe implements PipeTransform {
  private isObj(obj: any): boolean {
    return typeof obj === 'object' && obj !== null && !Array.isArray(obj)
  }

  private trim(values: any): any {
    Object.keys(values).forEach((key) => {
      if (this.isObj(values[key])) {
        values[key] = this.trim(values[key])
      } else if (typeof values[key] === 'string') {
        values[key] = values[key].trim()
      }
    })
    return values
  }

  transform(values: any, metadata: ArgumentMetadata) {
    if (this.isObj(values)) {
      return this.trim(values)
    }
    return values
  }
}






