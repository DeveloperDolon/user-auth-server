import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
// import router from './app/routes';
import { rateLimit } from 'express-rate-limit';
import router from './app/routes';

const app: Application = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
});

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, false);
      const allowedOrigins = [
        'http://localhost:5173',
        'https://user-auth-client.netlify.app',
      ];
      const regex = /^http:\/\/([a-zA-Z0-9-]+\.)?localhost:5173\/?$/;
      if (allowedOrigins.includes(origin) || regex.test(origin)) {
        return callback(null, true);
      }
      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

app.use(limiter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world from 9am solution jobtask backend!');
});

app.use('/', router);

app.use(globalErrorHandler);

app.use(notFound);

export default app;
