import { Request, Response, NextFunction } from "express";
// Load Logger
import logger from "../../../loaders/logger";

// Error handling function
import ApiError from "../error/apiError";

// Import models for types
import User from '../../models/user';
import City from '../../models/city';
import Event from '../../models/event';
type Schema = User | City | Event

export default function validateDto(schema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    logger.debug(`VALIDATE_DTO:req body is: ${req.body}`);
    try {
      const validatedBodyData = schema.$validate(req.body);
      // replace req body with verified values
      req.body = validatedBodyData;
      logger.debug(`AFTER VALIDATION :req body is: ${req.body}`);
      next();
    } catch (err) {
      next(ApiError.badRequest(err));
    }
  };
}
