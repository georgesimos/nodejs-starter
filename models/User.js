const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    facebook: String,
    google: String,
    role: {
      type: String,
      default: 'guest',
      enum: ['guest', 'admin', 'superadmin'],
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
