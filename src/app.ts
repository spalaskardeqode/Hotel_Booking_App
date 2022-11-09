import express, { Express, Request, Response, NextFunction } from 'express';
const app: Express = express();

import config from "config";
import router from './routes/bookingRoutes';

import sequelize from "./model";
import { CustomError } from './customError/customError';
sequelize.sync()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/v1/', router)


app.listen(config.get("port"), config.get("host"), () => {
    console.log(`Server is running on ${config.get("port")}`);
})

app.use(async (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    console.log(`Fired this api:->: ${req.url}: ${err.message}`);
    res.status(err.statusCode).json({ message: err.message })
    // next(err);
});