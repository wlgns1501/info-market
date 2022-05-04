declare namespace NodeJS {
  export interface ProcessEnv {
    username: string;
    password: string;
    database: string;

    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    BCRYPT_SALT_ROUNDS: string;
  }
}
