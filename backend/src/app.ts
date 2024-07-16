import express, { Express } from 'express';
import { AppServer } from '~/server';
import { config } from '~/config';

class App {
  public initialize(): void {
    this.loadConfig();
    const app: Express = express();

    const appServer: AppServer = new AppServer(app);
    appServer.start();
  }
  private loadConfig(): void {
    config.cloudinaryConfig();
  }
}
const app: App = new App();
app.initialize();
