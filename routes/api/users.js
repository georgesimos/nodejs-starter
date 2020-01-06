const router = require('express').Router();
const User = require('../../models/User');
const auth = require('../../config/auth');

/**
 * @route   POST /users
 * @desc    Register new user
 * @access  Public
 */
router.post('/', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

/**
 * @route   GET /users
 * @desc    Get all users
 * @access  Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(400).send(e);
  }
});

/**
 * @route   GET /users/me
 * @desc    Get logged in user details
 * @access  Private
 */
router.get('/me', auth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

/**
 * @route   GET /users/:id
 * @desc    Get user by id
 * @access  Private
 */
router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    return !user ? res.sendStatus(404) : res.send(user);
  } catch (e) {
    return res.sendStatus(400);
  }
});

/**
 * @route   PATCH /users/me
 * @desc    Update logged in user
 * @access  Private
 */
router.patch('/me', auth, async (req, res) => {
  const validationErrors = [];
  const updates = Object.keys(req.body);
  const profileUpdates = ['name', 'gender', 'location', 'website'];
  const allowedUpdates = ['email', 'password', 'role', ...profileUpdates];
  const isValidOperation = updates.every(update => {
    const isValid = allowedUpdates.includes(update);
    if (!isValid) validationErrors.push(update);
    return isValid;
  });

  if (!isValidOperation)
    return res.status(400).send({ error: `Invalid updates: ${validationErrors.join(',')}` });

  try {
    const { user } = req;
    updates.forEach(update => {
      if (profileUpdates.includes(update)) user.profile[update] = req.body[update];
      user[update] = req.body[update];
    });

    await user.save();
    return res.send(user);
  } catch (e) {
    return res.status(400).send(e);
  }
});

/**
 * @route   PATCH /users/:id
 * @desc    Update user by id
 * @access  Private
 */
router.patch('/:id', auth, async (req, res) => {
  const validationErrors = [];
  const updates = Object.keys(req.body);
  const profileUpdates = ['name', 'gender', 'location', 'website'];
  const allowedUpdates = ['email', 'password', 'role', ...profileUpdates];
  const isValidOperation = updates.every(update => {
    const isValid = allowedUpdates.includes(update);
    if (!isValid) validationErrors.push(update);
    return isValid;
  });

  if (!isValidOperation)
    return res.status(400).send({ error: `Invalid updates: ${validationErrors.join(',')}` });

  try {
    const _id = req.params.id;
    const user = await User.findById(_id);
    if (!user) return res.sendStatus(404);
    updates.forEach(update => {
      if (profileUpdates.includes(update)) user.profile[update] = req.body[update];
      user[update] = req.body[update];
    });
    await user.save();

    return res.send(user);
  } catch (e) {
    return res.status(400).send(e);
  }
});

/**
 * @route   DELETE /users/me
 * @desc    Delete logged in user
 * @access  Private
 */
router.delete('/me', auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send({ message: 'User Deleted' });
  } catch (e) {
    res.sendStatus(400);
  }
});

/**
 * @route   DELETE /users/:id
 * @desc    Delete user by id
 * @access  Private
 */
router.delete('/:id', auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(_id);
    if (!user) return res.sendStatus(404);

    return res.send({ message: 'User Deleted' });
  } catch (e) {
    return res.sendStatus(400);
  }
});

/**
 * @route   POST /users/login
 * @desc    Login a user
 * @access  Public
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send({
      error: { message: 'You have entered an invalid email or password' },
    });
  }
});

/**
 * @route   POST /users/logout
 * @desc    Logout a user
 * @access  Private
 */
router.post('/logout', auth, async (req, res) => {
  const { user } = req;
  try {
    user.tokens = user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await user.save();
    res.send({ message: 'You have successfully logged out!' });
  } catch (e) {
    res.status(400).send(e);
  }
});

/**
 * @route   POST /users/logoutAll
 * @desc    Logout a user from all devices
 * @access  Private
 */
router.post('/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send({ message: 'You have successfully logged out!' });
  } catch (e) {
    res.status(400).send(e);
  }
});
module.exports = router;
