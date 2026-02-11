import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import pool from '../config/db.js'

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })
}

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Strict",
  maxAge: 30 * 24 * 60 * 60 * 1000,
};

export const register = async (req, res) => {
  const { username, email, password } = req.body

  try {

    const userExists = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    )

    if (userExists.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
      [username, email, hashedPassword]
    )

    const token = generateToken(newUser.rows[0].id)

    res.cookie("token", token, cookieOptions);

    res.status(201).json({
      user: newUser.rows[0]
    })

  } catch (err) {
    console.log("Registration error", err)
    res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    )

    if (user.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      })
    }

    const userData = user.rows[0]

    const isMatch = await bcrypt.compare(password, user.rows[0].password)

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      })
    }

    const token = generateToken(userData.id)

    res.cookie("token", token, cookieOptions);

    res.json({
      user: {
        id: userData.id,
        username: userData.username,
        email: userData.email
      }
    })
  } catch (err) {
    console.log("Login error", err)
    res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

export const getMyBooks = async (req, res) => {
  res.json(req.user)
}

export const logout = async (req, res) => {
  res.cookie("token", "", { ...cookieOptions, maxAge: 1 });
  res.json({ 
    message: "Logged out successfully" 
  })
}