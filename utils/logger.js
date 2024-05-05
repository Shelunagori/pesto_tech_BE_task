const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, colorize, align, json } = format;

const logger = createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: combine(
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }),
    align(),
    json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: "./logs/tasks.log",
      format: format.json(),
    }),
  ],
});

module.exports = logger;
