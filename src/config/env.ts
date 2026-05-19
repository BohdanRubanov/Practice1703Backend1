import { cleanEnv, host, port, str } from "envalid";
import "dotenv/config";
export const ENV = cleanEnv(process.env, {
	PORT: port({ default: 3000 }),
	HOST: host({ default: "localhost" }),
	SECRET_KEY: str(),
	DATABASE_URL: str()
});
