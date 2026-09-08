import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        username: 'maya-chen',
        displayName: 'Maya Chen',
        email: 'maya.chen@example.com',
        goal: 'Run a 10K in under 55 minutes',
      },
      {
        username: 'leo-martin',
        displayName: 'Leo Martin',
        email: 'leo.martin@example.com',
        goal: 'Build consistent strength habits',
      },
      {
        username: 'sofia-reyes',
        displayName: 'Sofia Reyes',
        email: 'sofia.reyes@example.com',
        goal: 'Improve mobility and recovery',
      },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Summit Striders',
        description: 'A friendly team focused on endurance and steady progress.',
        color: '#0f766e',
        memberIds: [users[0]._id, users[1]._id],
      },
      {
        name: 'Trailblazers',
        description: 'Strength, mobility, and outdoor training for every level.',
        color: '#ea580c',
        memberIds: [users[2]._id],
      },
    ]);

    await User.updateOne({ _id: users[0]._id }, { teamId: teams[0]._id });
    await User.updateOne({ _id: users[1]._id }, { teamId: teams[0]._id });
    await User.updateOne({ _id: users[2]._id }, { teamId: teams[1]._id });

    await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'Outdoor run',
        durationMinutes: 42,
        distanceKm: 7.4,
        calories: 516,
        performedAt: new Date('2026-09-06T07:30:00Z'),
      },
      {
        userId: users[1]._id,
        type: 'Strength training',
        durationMinutes: 38,
        calories: 284,
        performedAt: new Date('2026-09-07T17:45:00Z'),
      },
      {
        userId: users[2]._id,
        type: 'Mobility flow',
        durationMinutes: 25,
        calories: 112,
        performedAt: new Date('2026-09-05T08:15:00Z'),
      },
    ]);

    await LeaderboardEntry.insertMany([
      { userId: users[0]._id, teamId: teams[0]._id, points: 860, rank: 1, period: '2026-W36' },
      { userId: users[1]._id, teamId: teams[0]._id, points: 720, rank: 2, period: '2026-W36' },
      { userId: users[2]._id, teamId: teams[1]._id, points: 590, rank: 3, period: '2026-W36' },
    ]);

    await Workout.insertMany([
      {
        title: 'Foundation Full Body',
        description: 'A balanced session for building strength with controlled movement.',
        difficulty: 'beginner',
        durationMinutes: 30,
        exercises: ['Bodyweight squat', 'Incline push-up', 'Glute bridge', 'Dead bug'],
        target: 'Full body strength',
      },
      {
        title: 'Runner\'s Power Session',
        description: 'Short intervals and lower-body strength to support faster running.',
        difficulty: 'intermediate',
        durationMinutes: 40,
        exercises: ['Walking lunge', 'Step-up', 'Mountain climber', 'Plank'],
        target: 'Running performance',
      },
      {
        title: 'Deep Recovery Flow',
        description: 'Gentle mobility work for hips, shoulders, and the spine.',
        difficulty: 'beginner',
        durationMinutes: 20,
        exercises: ['Cat-cow', 'World\'s greatest stretch', 'Pigeon pose', 'Child\'s pose'],
        target: 'Mobility and recovery',
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
