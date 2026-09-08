import express from 'express';
import mongoose from 'mongoose';
import {
  activityRoutes,
  leaderboardRoutes,
  teamRoutes,
  userRoutes,
  workoutRoutes,
} from './routes.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;

const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiUrl: baseUrl });
});

app.get('/api/config', (_request, response) => {
  response.json({ apiUrl: baseUrl });
});

app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/workouts', workoutRoutes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db')
  .then(() => console.log('Connected to octofit_db'))
  .catch((error: unknown) => console.error('MongoDB unavailable:', error));

app.listen(port, () => {
  console.log(`OctoFit API listening at ${baseUrl}`);
});
