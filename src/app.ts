import * as dotenv from "dotenv";
import express, { Application } from "express";
import fs from "fs";
import helmet from "helmet";
import { Server, ServerOptions } from "http";
import logger from "morgan";
import { ConnectionError } from "sequelize";

import { LOG_FILE } from "./constants";
import { config, sequelize } from "./utils";

dotenv.config();

async function bootstrap(): Promise<void> {
  // Initializing the constants
  const PORT: number = config.default.port || 8000;
  const HOST: string = config.default.host;
  const application: Application = express();

  // Initializing the Middlewares
  application.use(express.json());
  application.use(express.urlencoded({ extended: true }));
  application.use(helmet());
  application.use(
    logger("combined", {
      stream: fs.createWriteStream(LOG_FILE, { flags: "a" }),
    })
  );

  // HTTP Server
  const serverOptions: ServerOptions = {};
  const server: Server = new Server(serverOptions, application);
  server.listen(PORT, HOST, (): void => {
    console.log(server.address());

    // Database Connection
    try {
      sequelize.getSequelize().authenticate();
    } catch (e: unknown) {
      if (e instanceof ConnectionError) {
        throw {
          name: e.name,
          message: e.message,
        };
      }
    }
  });
}

bootstrap();
