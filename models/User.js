const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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
    tokens: [{ token: { type: String, required: true }, expired: Number }],
  },
  { timestamps: true }
);

/**
 * Password hash middleware.
 */
userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

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
  const expired = Math.floor(Date.now() / 1000) + 20 * 60;
  const token = jwt.sign({ _id: user._id.toString(), iat: expired }, process.env.JWT_SECRET);
  user.tokens = user.tokens.concat({ token, expired });
  await user.save();
  return { token, expired };
};

/**
 * Helper static method for finding user by credentials
 */
userSchema.statics.findByCredentials = async function(email, password) {
  const User = this;
  const user = await User.findOne({ email });
  if (!user) throw new Error('Unable to login');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Unable to login');

  return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
