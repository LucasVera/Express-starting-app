import winston from 'winston';
import moment from 'moment';

const { format: { combine, timestamp, label, printf } } = winston;

const myFormat = printf(info => {
  let { message } = info;
  if (typeof message !== 'string') {
    message = JSON.stringify(message, Object.getOwnPropertyNames(message));
  }
  return `${moment(info.timestamp).format('DD-MM-YYYY hh:mm:ssa Z')} [${info.label}] ${info.level}: ${message}`;
});

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs.log' })
  ],
  format: combine(label({ label: 'Express-starter-app' }), timestamp(), myFormat),
  levels: winston.config.npm.levels
});
