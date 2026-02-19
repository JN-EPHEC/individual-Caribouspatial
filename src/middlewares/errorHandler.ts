import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction ): void => {
    console.error(err);

    const status: number = err.status || 500;
    const message: string = err.message || "Internal Server Error";

    res.status(status).json({ message });
};