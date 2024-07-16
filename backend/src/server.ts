import { consoleLogger, CustomeError, IErrorResponse } from '@quan0401/ecommerce-shared';
import compression from 'compression';
import cookieSession from 'cookie-session';
import cors from 'cors';
import { Application, json, NextFunction, Request, Response, urlencoded } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import 'express-async-errors';
import { Logger } from 'winston';
import { connectDatabae } from '~/database';
import applicationRoutes from '~/routes';
import { config } from './config';
import { StatusCodes } from 'http-status-codes';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import { ValidationError } from 'sequelize';
import http from 'http';
import { Server } from 'socket.io';
import { SocketIOChatHandler } from '~services/socket/chat.socket';

const PORT = 6969;
const log: Logger = consoleLogger('AppServer', 'debug');

export class AppServer {
  private app: Application;
  constructor(app: Application) {
    this.app = app;
  }
  public start(): void {
    this.securityMiddleware(this.app);
    this.standardMiddleware(this.app);
    this.loggingMiddleware(this.app); // Add this line
    this.routesMiddleware(this.app);
    this.globalErrorHandler(this.app);
    this.startHttpServer(this.app);
    connectDatabae();
  }
  private async startHttpServer(app: Application): Promise<void> {
    const httpServer: http.Server = new http.Server(app);
    const socketIO: Server = await this.createSocketIO(httpServer);
    new SocketIOChatHandler(socketIO);
    httpServer.listen(PORT, () => {
      log.info(`http.Server is running on port ${PORT}`);
    });
  }
  private standardMiddleware(app: Application): void {
    app.use(compression());
    app.use(json({ limit: '200mb' }));
    app.use(urlencoded({ extended: true, limit: '200mb' }));
  }
  private securityMiddleware(app: Application): void {
    app.use(
      cookieSession({
        name: 'session',
        keys: [config.SECRET_KEY_ONE!, config.SECRET_KEY_TWO!],
        maxAge: 3600 * 1000,
        secure: config.NODE_ENV !== 'development'
      })
    );
    app.set('trust proxy', true);
    app.use(hpp());
    app.use(helmet());
    app.use(
      cors({
        origin: config.CLIENT_URL,
        credentials: true,
        optionsSuccessStatus: 200,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
      })
    );
  }
  private routesMiddleware(app: Application): void {
    applicationRoutes(app);
  }
  private async createSocketIO(httpServer: http.Server): Promise<Server> {
    const io: Server = new Server(httpServer, {
      cors: {
        origin: `${config.CLIENT_URL}`,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
      }
    });
    // const pubClient = createClient({ url: config.REDIS_HOST });
    // const subClient = pubClient.duplicate();
    // await Promise.all([pubClient.connect(), subClient.connect()]);
    // io.adapter(createAdapter(pubClient, subClient));
    // socketIO = io;
    return io;
  }

  private loggingMiddleware(_app: Application): void {
    // const logStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
    // // Define a custom token to get the client's real IP address
    // morgan.token('remote-addr', (req: any) => {
    //   return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // });
    // app.use(morgan(':remote-addr :method :url :status :res[content-length] - :response-time ms', { stream: logStream }));
  }

  private globalErrorHandler(app: Application): void {
    app.all('*', (req: Request, res: Response) => {
      res.status(StatusCodes.NOT_FOUND).send('What!!! this route is not existed');
    });

    app.use((err: IErrorResponse, req: Request, res: Response, next: NextFunction) => {
      // log.error(err);

      if (err instanceof CustomeError) {
        // Send back to the client
        return res.status(err.serializeError().statusCode).json(err.serializeError());
      } else if (err instanceof ValidationError) {
        const errors = err.errors.map((error) => {
          return {
            message: error.message,
            type: error.type
          };
        });
        log.error(errors);
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Bad Request error',
          statusCode: StatusCodes.BAD_REQUEST
        });
      } else {
        log.error(err);
      }
      next();
    });
  }
}
