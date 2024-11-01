import type { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";

const handleCastErrorDB = (err: AppError) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err: AppError) => {
  const message = `Duplicate field value:${err.keyValue.name}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorsDB = (err: AppError) => {
  const { message } = err;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError("Invalid token,please login again", 401);

const handleJWTExpiredError = () =>
  new AppError("Your Token has been expired please login again", 401);

const sendErrorDev = (err: AppError, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err: AppError, res: Response) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something Went Wrong",
    });
  }
};

export default (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };

    if (err.name === "CastError") {
      error = handleCastErrorDB(err);
    } else if (err.code === 11000) {
      error = handleDuplicateFieldsDB(err);
    } else if (err.name === "ValidationError") {
      error = handleValidationErrorsDB(err);
    } else if (err.name === "JsonWebTokenError") {
      error = handleJWTError();
    } else if (err.name === "TokenExpiredError") {
      error = handleJWTExpiredError();
    }

    sendErrorProd(error, res);
  }
};
