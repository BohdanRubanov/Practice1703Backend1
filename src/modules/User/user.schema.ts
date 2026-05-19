import * as yup from "yup";

export const UserSchema = {
	login: yup.object({
		email: yup.string().email().required(),
		password: yup.string().required(),
	}),
	register: yup.object({
		email: yup.string().email().required(),
		username: yup.string().required(),
		password: yup.string().required(),
		name: yup.string().required(),
		surname: yup.string().required(),
	}),
};
