import { Router } from "express";
import city from "./city";
import user from "./user";
const app = Router();
city(app);
user(app);

export default app;
