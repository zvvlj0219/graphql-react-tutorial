import { Request, Response, NextFunction } from "express";
import CustomError from "./customError";

const errorHandler = (
    error: CustomError,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    res.status(status).send({
        status,
        message,
    })
    next()
}

export default errorHandler