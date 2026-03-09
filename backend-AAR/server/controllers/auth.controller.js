const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const JWT_SECRET = process.env.JWT_SECRET || 'AAR_Compatibility_Project_SuperSecret_2026';

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const result = await pool.query(
      `
      SELECT u."UserID", u."name", u."email", u."password_hash",
             r."name" AS role
      FROM "User_ID" u
      JOIN "Rol" r ON r."RolID" = u."RolRolID"
      WHERE u."email" = $1
      `,
      [email]
    );

    if (result.rowCount === 0) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const user = result.rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);

    if (!ok) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const payload = {
      sub: user.UserID,
      role: user.role,
      name: user.name,
      email: user.email,
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '8h',
    });

    return res.json({
      token,
      user: {
        id: user.UserID,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return next(err);
  }
}

function getMe(req, res) {
  return res.json({ user: req.user });
}

module.exports = { login, getMe };
