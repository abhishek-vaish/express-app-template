import * as dotenv from "dotenv";
import express, { Application } from "express";
import fs from "fs";
import helmet from "helmet";
import { Server, ServerOptions } from "http";
import logger from "morgan";

import { LOG_FILE, RESOURCES_FILE } from "./constants";
import { FILENOTFOUNDEXCEPTION } from "./constants/message";
import { FileNotFoundException } from "./exceptions";
import { IConfig } from "./interfaces/config";

dotenv.config();

async function bootstrap(): Promise<void> {
  // Read Configuration File from the resources
  let config: IConfig;
  try {
    config = JSON.parse(fs.readFileSync(RESOURCES_FILE, "utf-8"));
  } catch (e: unknown) {
    throw new FileNotFoundException(FILENOTFOUNDEXCEPTION);
  }

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
  });
}

bootstrap();
