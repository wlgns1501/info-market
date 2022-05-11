// declare global {
//   namespace NodeJS {
//     export interface ProcessEnv {
//       username: string;
//       password: string;
//       database: string;

//       JWT_SECRET: string;
//       JWT_EXPIRES_IN: string;
//       BCRYPT_SALT_ROUNDS: string;
//     }
//   }
// }

// export {};

declare namespace NodeJS {
  export interface ProcessEnv {
    username: string;
    password: string;
    database: string;

    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    BCRYPT_SALT_ROUNDS: string;

    IMP_CODE: string;
    IMP_KEY: string;
    IMP_SECRET: string;
    IMP_CID: string;
  }
}
