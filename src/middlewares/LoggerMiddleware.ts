import fs from "fs";
import path from "path";
import morgan from "morgan";
import { Application } from "express";

const logsDirectory = path.join(__dirname + '/../logs/access.log');
const accessLog = fs.createWriteStream(logsDirectory, { flags: 'a' });

export const LoggerMiddleware = (app: Application) => {
  app.use(morgan('combined', { stream: accessLog }));
}