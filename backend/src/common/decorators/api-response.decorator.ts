import { applyDecorators, Type } from '@nestjs/common'
import { ApiResponse, ApiResponseOptions } from '@nestjs/swagger'

export const ApiStandardResponse = <TModel extends Type<any>>(
  model: TModel,
  options?: ApiResponseOptions,
) => {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'Success',
      type: model,
      ...options,
    }),
  )
}





