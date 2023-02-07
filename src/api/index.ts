import { Router } from "express";
import config from "../config";
import api from "./routes/api";

const app = Router();
app.use(config.API.PREFIX, api);

export default app;
