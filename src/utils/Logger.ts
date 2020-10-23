import winston, { loggers } from "winston";
import { GLOBAL_PATHS } from "../settings";

const options = {
  file: {
    level: 'info',
    filename: GLOBAL_PATHS.LOGS + '/debug.log',
    handleExceptions: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};


const Logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false
});


export default Logger;
