import { Request, Response, NextFunction } from "express";
import logger from "../../../loaders/logger";
import ApiError from "../error/apiError";

export default function validateDto(schema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    logger.info(`VALIDATE_DTO:req body is: ${req.body}`);
    try {
      const validatedBodyData = await schema.validate(req.body);
      // replave req body with verified values
      req.body = validatedBodyData;
      next();
    } catch (err) {
      next(ApiError.badRequest(err));
    }
  };
}
