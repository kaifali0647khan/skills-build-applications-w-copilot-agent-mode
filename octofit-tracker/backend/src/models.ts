import mongoose, { Schema } from 'mongoose';

const flexibleSchema = new Schema({}, { strict: false, timestamps: true });

export const User = mongoose.model('User', flexibleSchema);
export const Team = mongoose.model('Team', flexibleSchema);
export const Activity = mongoose.model('Activity', flexibleSchema);
export const Leaderboard = mongoose.model('Leaderboard', flexibleSchema);
export const Workout = mongoose.model('Workout', flexibleSchema);