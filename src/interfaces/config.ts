interface IDefault {
  host: string;
  port: number;
}

interface IDatabase {
  uri: string;
}

export interface IConfig {
  default: IDefault;
  database: IDatabase;
}
