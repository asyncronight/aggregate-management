import * as express from 'express';
import * as cors from 'cors';
// import * as admin from 'firebase-admin';

// Initialize an express app
export const app: express.Application = express();
// Add cors configuration
const corsOptions = {
  origin: 'http://localhost:4200'
};
app.use(cors(corsOptions));
// Add body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Create an express Router and define the endpoints
const route: express.Router = express.Router();
/**
 * POST: /api/data-receiver/data
 * Save data to firestore
 * Expected data:
 */
route.post(
  '/data',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.log({ data: req.body });
    res.status(200).json({ data: req.body });
  }
);
// Register the router in the express app
app.use('/api/data-receiver', route);
// Add a 404 handler
app.all('**', (_, res) => res.status(404).send({ message: 'URL Not Found' }));
// Add error handler
app.use(
  (
    error: Error,
    _: express.Request,
    res: express.Response,
    __: express.NextFunction
  ) => {
    console.error('Something failed!', error);
    res.status(500).json({ error });
  }
);
