import type{ createContact, Icontact } from "./contact.types";
import type { NextFunction, Request, Response } from "express";
import { InferType } from "yup";
import { ContactSchema } from "../contact.shema";

export interface ContactControllerContract {
	create: (
		req: Request<
			object,
			Icontact[] | string,
			InferType<typeof ContactSchema.contact>,
            object, 
            { userId: number }
		>,
		res: Response<Icontact | string, { userId: number }>,
		next: NextFunction
	) => void;
	getAll: (
		req: Request<
			object,
			Icontact[],
			object,
			object,
            { userId: number }
		>,
		res: Response<Icontact[] | string, { userId: number }>,
		next: NextFunction
	) => void;
	getById: (
		req: Request<
            {id:string},
            Icontact | string,
			object,
            object,
			{ userId: number }
		>,
		res: Response<Icontact | string, { userId: number }>,
		next: NextFunction
	) => void;
}

export interface ContactServiceContract {
	create: (data: InferType<typeof ContactSchema.contact>,userId:number, filename: string) => Promise<Icontact>;
	getAll: (userId:number) => Promise<Icontact[]>;
	getById: (userId: number,id:number) => Promise<Icontact>;
}

export interface ContactRepositoryContract {
	create: (data: InferType<typeof ContactSchema.contact>,userId:number, filename: string) => Promise<Icontact>;
	getAll: (userId: number) => Promise<Icontact[]>;
	getById: (userId: number,id:number) => Promise<Icontact | null>;
}