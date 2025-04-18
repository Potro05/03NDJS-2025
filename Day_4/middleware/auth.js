import jwt from 'jsonwebtoken';

export default function(req, res, next) {
  const auth = req.headers.authorization?.split(' ')[1]; 
  if (!auth) return res.status(401).json({ error: 'Token missing' });

  try {
    const payload = jwt.verify(auth, process.env.JWT_SECRET);
    req.user = payload; 
    next();
  } catch {
    res.status(401).json({ error: 'Token invalide' });
  }
}
