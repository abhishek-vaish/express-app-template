import * as dotenv from "dotenv";
import { Sequelize } from "sequelize";
import { DB_PATH } from "../constants";
import config from "./config";

dotenv.config();

class Connection {
  private sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize({
      dialect: process.env.NODE_ENV === "development" ? "sqlite" : "mssql",
      storage:
        process.env.NODE_ENV === "development" ? DB_PATH : config.database.uri,
    });
  }

  getSequelize(): Sequelize {
    return this.sequelize;
  }
}

const sequelize: Connection = new Connection();

export default sequelize;
