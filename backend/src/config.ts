import dotenv from 'dotenv';
import { v2 } from 'cloudinary';
dotenv.config();
class Config {
  public SECRET_KEY_ONE: string | undefined;
  public SECRET_KEY_TWO: string | undefined;
  public MYSQL_DB: string | undefined;
  public JWT_TOKEN: string | undefined;
  public NODE_ENV: string | undefined;
  public CLOUD_NAME: string | undefined;
  public CLOUD_API_KEY: string | undefined;
  public CLOUD_API_SECRET: string | undefined;
  public CLOUD_FOLDER: string | undefined;
  public CLIENT_URL: string | undefined;
  public MOMO_ACCESS_KEY: string | undefined;
  public MOMO_SECRET_KEY: string | undefined;
  public SENDER_EMAIL: string | undefined;
  public SENDER_EMAIL_PASSWORD: string | undefined;

  constructor() {
    this.MYSQL_DB = process.env.MYSQL_DB;
    this.JWT_TOKEN = process.env.JWT_TOKEN;
    this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE;
    this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO;
    this.NODE_ENV = process.env.NODE_ENV;
    this.CLOUD_NAME = process.env.CLOUD_NAME;
    this.CLOUD_FOLDER = process.env.CLOUD_FOLDER;
    this.CLOUD_API_KEY = process.env.CLOUD_API_KEY;
    this.CLOUD_API_SECRET = process.env.CLOUD_API_SECRET;
    this.CLIENT_URL = process.env.CLIENT_URL;
    this.MOMO_ACCESS_KEY = process.env.MOMO_ACCESS_KEY;
    this.MOMO_SECRET_KEY = process.env.MOMO_SECRET_KEY;
    this.SENDER_EMAIL = process.env.SENDER_EMAIL;
    this.SENDER_EMAIL_PASSWORD = process.env.SENDER_EMAIL_PASSWORD;
  }

  public cloudinaryConfig(): void {
    v2.config({
      secure: this.NODE_ENV !== 'development',
      api_key: this.CLOUD_API_KEY,
      api_secret: this.CLOUD_API_SECRET,
      cloud_name: this.CLOUD_NAME
    });
  }
}
export const config: Config = new Config();
