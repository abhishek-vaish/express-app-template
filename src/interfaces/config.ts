interface IDefault {
  host: string;
  port: number;
}

interface IDatabase {}

export interface IConfig {
  default: IDefault;
  database: IDatabase;
}
