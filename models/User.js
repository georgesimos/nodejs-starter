const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

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
    tokens: [{ token: { type: String, required: true } }],
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

/**
 * Helper method for generating Auth Token
 */
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
