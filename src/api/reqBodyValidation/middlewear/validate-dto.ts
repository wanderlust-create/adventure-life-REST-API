import { Request, Response, NextFunction } from 'express';
import { AnySchema, ValidationError } from 'yup'; // 👈 add this
import logger from '../../../loaders/logger';
import ApiError from '../error/apiError';

export default function validateDto(schema: AnySchema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedBodyData = await schema.validate(req.body, { abortEarly: false });
      req.body = validatedBodyData;
      logger.debug('✅ Validation successful');
      next();
    } catch (err) {
      if (err instanceof ValidationError) {
        logger.warn('❌ Validation failed:', err.errors);
        next(ApiError.badRequest({ message: 'Validation failed', errors: err.errors }));
      } else {
        next(err);
      }
    }
  };
}
