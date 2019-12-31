const router = require('express').Router();
const User = require('../models/User');

// Create a user
router.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const { token, expired } = await user.generateAuthToken();
    res.status(201).send({ user, token: { token, expired } });
  } catch (e) {
    res.status(400).send(e);
  }
});

// Login User
router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const { token, expired } = await user.generateAuthToken();
    res.send({ user, token: { token, expired } });
  } catch (e) {
    res.status(400).send({
      error: { message: 'You have entered an invalid email or password' },
    });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
