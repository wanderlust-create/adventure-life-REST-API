import { Router } from "express";
import city from "./city";
import user from "./user";
import event from "./event";
const app = Router();
city(app);
user(app);
event(app);

export default app;
