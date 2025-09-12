const User = require('../models/User');
const { signAccessToken } = require('../utils/jwt');

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, address } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already in use' });
    }
    const user = await User.create({ firstName, lastName, email, password, phone, address });
    const token = signAccessToken(user._id.toString(), user.role);
    return res.status(201).json({ token, user });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to register' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const match = await user.comparePassword(password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });
    user.password = undefined;
    const token = signAccessToken(user._id.toString(), user.role);
    return res.json({ token, user });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to login' });
  }
};

const logout = async (_req, res) => {
  // Stateless JWT: client should discard token
  return res.json({ message: 'Logged out' });
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json({ user });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to fetch profile' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const allowed = ['firstName', 'lastName', 'phone', 'address', 'password'];
    const updates = {};
    for (const key of allowed) {
      if (key in req.body) updates[key] = req.body[key];
    }
    const user = await User.findById(req.user.id).select('+password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    Object.assign(user, updates);
    await user.save();
    user.password = undefined;
    return res.json({ user });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to update profile' });
  }
};

module.exports = { register, login, logout, getProfile, updateProfile };


