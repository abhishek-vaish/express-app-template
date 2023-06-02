import * as dotenv from "dotenv";
import path from "path";

dotenv.config();

const PARENT_DIR: string = path.dirname(path.dirname(__dirname));
const RESOURCES_DIR: string = path.join(PARENT_DIR, "resources");
const LOG_DIR: string = path.join(PARENT_DIR, "logs");

export const RESOURCES_FILE: string = path.join(
  RESOURCES_DIR,
  `${process.env.NODE_ENV}.json`
);

export const LOG_FILE: string = path.join(
  LOG_DIR,
  `${process.env.NODE_ENV}.log`
);
