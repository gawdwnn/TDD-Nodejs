import express from 'express';
import UserRouter from './user/UserRouter.js';

const app = express();

app.use(express.json());

app.use(UserRouter);

export default app;
