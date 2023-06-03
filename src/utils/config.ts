import fs from "fs";

import { RESOURCES_FILE } from "../constants";
import { FILENOTFOUNDEXCEPTION } from "../constants/message";
import { FileNotFoundException } from "../exceptions";
import { IConfig } from "../interfaces/config";

let config: IConfig;
try {
  config = JSON.parse(fs.readFileSync(RESOURCES_FILE, "utf-8"));
} catch (e: unknown) {
  throw new FileNotFoundException(FILENOTFOUNDEXCEPTION);
}

export default config;
