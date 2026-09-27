import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    const users = [
      { username: 'maya.chen', email: 'maya.chen@example.com', name: 'Maya Chen', age: 29, fitnessGoal: 'Build endurance' },
      { username: 'liam.johnson', email: 'liam.johnson@example.com', name: 'Liam Johnson', age: 34, fitnessGoal: 'Improve strength' },
      { username: 'sofia.patel', email: 'sofia.patel@example.com', name: 'Sofia Patel', age: 26, fitnessGoal: 'Stay active' },
    ];
    for (const user of users) {
      await User.updateOne({ email: user.email }, { $set: user }, { upsert: true });
    }

    const teams = [
      { name: 'Morning Movers', description: 'A friendly crew starting the day with movement.', members: users.map(({ username }) => username) },
      { name: 'Weekend Trailblazers', description: 'Outdoor walks, hikes, and weekend challenges.', members: ['maya.chen', 'sofia.patel'] },
    ];
    for (const team of teams) {
      await Team.updateOne({ name: team.name }, { $set: team }, { upsert: true });
    }

    const activities = [
      { username: 'maya.chen', type: 'Run', durationMinutes: 35, distanceKilometers: 5.2, calories: 340, date: new Date('2026-09-25T07:30:00Z') },
      { username: 'liam.johnson', type: 'Strength training', durationMinutes: 45, calories: 280, date: new Date('2026-09-25T17:00:00Z') },
      { username: 'sofia.patel', type: 'Cycling', durationMinutes: 50, distanceKilometers: 18, calories: 410, date: new Date('2026-09-26T09:00:00Z') },
    ];
    for (const activity of activities) {
      await Activity.updateOne(
        { username: activity.username, type: activity.type, date: activity.date },
        { $set: activity },
        { upsert: true },
      );
    }

    const leaderboard = [
      { username: 'maya.chen', team: 'Morning Movers', points: 1280, rank: 1 },
      { username: 'sofia.patel', team: 'Morning Movers', points: 1140, rank: 2 },
      { username: 'liam.johnson', team: 'Morning Movers', points: 980, rank: 3 },
    ];
    for (const entry of leaderboard) {
      await Leaderboard.updateOne({ username: entry.username }, { $set: entry }, { upsert: true });
    }

    const workouts = [
      { name: 'Quick Cardio Circuit', description: 'A balanced interval session for busy days.', difficulty: 'Beginner', durationMinutes: 20, exercises: ['Jumping jacks', 'Bodyweight squats', 'High knees', 'Rest'] },
      { name: 'Full-Body Strength', description: 'A simple strength session using bodyweight movements.', difficulty: 'Intermediate', durationMinutes: 35, exercises: ['Push-ups', 'Reverse lunges', 'Glute bridges', 'Plank'] },
      { name: 'Recovery and Mobility', description: 'Gentle mobility work to support recovery.', difficulty: 'Beginner', durationMinutes: 15, exercises: ['Cat-cow stretch', "World's greatest stretch", 'Hip flexor stretch', "Child's pose"] },
    ];
    for (const workout of workouts) {
      await Workout.updateOne({ name: workout.name }, { $set: workout }, { upsert: true });
    }

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
