import type { NextFunction, Request, Response } from "express";
import { type AnyObjectSchema, ValidationError as YupValidationError } from "yup";
import { ValidationError } from "../errors/app-errors";
export function validateMiddleware(schema: AnyObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const validated = await schema.validate(req.body, {
                abortEarly: false,
                stripUnknown: true
            });
            req.body = validated;
            next();
        }
        catch (error) {
            if (error instanceof YupValidationError) {
                next(new ValidationError(error.message));
                return;
            }
            next(error);
        }
    };
}
