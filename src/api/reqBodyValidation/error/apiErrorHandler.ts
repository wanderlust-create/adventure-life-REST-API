import ApiError from "./apiError";
import logger from "../../../loaders/logger";
import { Request, Response, NextFunction } from "express";

export default function apiErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  logger.error(err);

  if (err instanceof ApiError) {
    return res.status(err.code).json(err.message);
  }

  return res.status(500).json("An error occurred");
}
