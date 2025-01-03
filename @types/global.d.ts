declare namespace NodeJS {
  interface ProcessEnv {
    CLOUDINARY_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_SECRET_KEY: string;
    BASE_URL: string;
    SECRET_KEY: string;
    PORT: string;
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_HOST: string;
    DB_PORT: string;
  }
}
