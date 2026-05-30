import { ValidationError } from "../errors/app-errors";
import { join } from "node:path";
import multer, { memoryStorage } from "multer";
import sharp from "sharp";
import type { NextFunction, Request, Response } from "express";
import { originalDir, thumbDir } from "../config/path";
import { access } from "node:fs/promises";
async function imageExist(fileName: string): Promise<boolean> {
    try {
        await access(join(thumbDir, fileName));
        return true;
    }
    catch {
        return false;
    }
}
export const uploadMiddleware = multer({ storage: memoryStorage() });
export function procImgMiddleware(width: number, quality: number, fieldName: string = "avatar") {
    return async (req: Request, res: Response, next: NextFunction) => {
        const file = req.body[fieldName];
        try {
            if (file && typeof file === "string") {
                if (await imageExist(file)) {
                    if (!req.file) {
                        req.file = {} as Express.Multer.File;
                    }
                    req.file.filename = file;
                    next();
                    return;
                }
                else {
                    next(new ValidationError("file not exists"));
                }
            }
            if (req.file) {
                const fileName = `${Date.now()}.jpg`;
                const filePathOriginal = join(originalDir, fileName);
                const filePathThumb = join(thumbDir, fileName);
                await sharp(req.file.buffer).toFile(filePathOriginal);
                await sharp(req.file.buffer).resize({ width }).jpeg({ quality }).toFile(filePathThumb);
                req.file.filename = fileName;
                next();
                return;
            }
            next(new ValidationError("file was not uploaded"));
            return;
        }
        catch (error) {
            next(error);
        }
    };
}
