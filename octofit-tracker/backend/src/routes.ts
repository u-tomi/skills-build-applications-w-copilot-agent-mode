import { Router, type Request, type Response } from 'express';
import type { Model } from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models.js';

const createResourceRouter = <T>(model: Model<T>) => {
  const router = Router();

  router.get('/', async (_request: Request, response: Response) => {
    try {
      response.json(await model.find().lean());
    } catch (error) {
      response.status(503).json({ error: 'Database unavailable' });
    }
  });

  router.post('/', async (request: Request, response: Response) => {
    try {
      const resource = await model.create(request.body);
      response.status(201).json(resource);
    } catch (error) {
      response.status(400).json({ error: 'Invalid resource', details: error });
    }
  });

  return router;
};


export const userRoutes = createResourceRouter(User);
export const teamRoutes = createResourceRouter(Team);
export const activityRoutes = createResourceRouter(Activity);
export const leaderboardRoutes = createResourceRouter(LeaderboardEntry);
export const workoutRoutes = createResourceRouter(Workout);
