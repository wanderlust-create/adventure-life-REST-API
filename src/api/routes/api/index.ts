import { Router } from "express";
import city from "./city";
const app = Router();
city(app);

export default app;
