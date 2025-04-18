import User from '../models/User.js';
import jwt  from 'jsonwebtoken';

export async function register(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: 'Champs manquants' });

    if (await User.findOne({ email }))
      return res.status(409).json({ error: 'Utilisateur existe déjà' });

    const user = await User.create({ email, password });
    res.status(201).json({ email: user.email, id: user._id });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ error: 'Identifiants invalides' });

    const token = jwt.sign(
      { id: user._id, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ token });
  } catch {
    res.status(500).json({ error: 'Erreur serveur' });
  }
}
