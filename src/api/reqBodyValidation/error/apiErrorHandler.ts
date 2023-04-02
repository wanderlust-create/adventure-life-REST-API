import ApiError from "./apiError";
import logger from "../../../loaders/logger";
import { Request, Response, NextFunction } from "express";

export default function apiErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    logger.error(err);
  } catch (error) {
    console.error("Error occurred during logging:", error);
  }

  if (err instanceof ApiError) {
    return res.status(err.code).json(err.message);
  }

  return res.status(500).json("An error occurred");
}
