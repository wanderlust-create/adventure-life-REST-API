import ApiError from './apiError';
import logger from '../../../loaders/logger';
import { Request, Response, NextFunction } from 'express';

export default function apiErrorHandler(
  err: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  try {
    logger.error(`Error during ${req.method} ${req.url}:`, err);
  } catch (loggingErr) {
    console.error('Error occurred during logging:', loggingErr);
  }

  if (err instanceof ApiError) {
    return res.status(err.code).json({ error: err.message });
  }

  return res.status(500).json({ error: 'An unexpected error occurred' });
}
