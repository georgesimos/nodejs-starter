const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = Schema(
  {
    email: { type: String, unique: true },
    emailVerified: Boolean,
    password: String,
    facebook: String,
    google: String,
    role: {
      type: String,
      default: 'guest',
      enum: ['guest', 'admin', 'superadmin'],
    },
    profile: {
      name: String,
      gender: String,
      location: String,
      website: String,
      picture: String,
    },
  },
  { timestamps: true }
);

/**
 * Hide properties of Mongoose User object.
 */
userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();
  if (!userObject.role === 'superadmin') {
    delete userObject.updatedAt;
    delete userObject.__v;
  }
  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
