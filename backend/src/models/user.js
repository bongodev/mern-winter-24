import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
    },
    lname: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    userType: {
      type: String,
      enum: ['admin', 'customer'],
      default: 'customer',
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model('User', UserSchema);
