import { Router } from 'express';
import city from './city';
import user from './user';
import event from './event';
import userCity from './userCity';
const app = Router();
city(app);
user(app);
event(app);
userCity(app);

export default app;
