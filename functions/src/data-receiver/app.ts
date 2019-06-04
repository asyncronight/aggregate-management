import * as express from 'express';
import * as cors from 'cors';
import * as admin from 'firebase-admin';

// Initialize an express app
export const app: express.Application = express();
// Add cors configuration
const corsOptions = {
  origin: 'http://localhost:4200'
};
app.use(cors(corsOptions));
// Create an express Router and define the endpoints
const route: express.Router = express.Router();
/**
 * POST: /api/data-receiver/data
 * Save data to firestore
 * Expected data:
 */
route.post('/data', async (req: express.Request, res: express.Response) => {
  res.send('Hello');
});
app.use('/api/data-receiver', route);
