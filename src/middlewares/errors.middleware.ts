import { AppError } from "../errors/app-errors";
import type { NextFunction, Request, Response } from "express";

export function errorMiddleware(error:Error, req:Request, res:Response, next: NextFunction){
    console.log(error)
    if(error instanceof AppError){
        res.status(Number(error.code)).json(error.message)
        return
    }
    res.status(500).json({
        message: "Internal Server Error"
    })
}