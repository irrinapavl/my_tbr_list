import crypto from 'crypto'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { sendVerificationEmail, sendPassRecoveryEmail } from '../middleware/mailer.js'
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
}

const generateRawToken = () => crypto.randomBytes(32).toString('hex')
const hashToken = (rawToken) => crypto.createHash('sha256').update(rawToken).digest('hex')

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

    const user = newUser.rows[0]
    const rawToken = generateRawToken()
    const hashedToken = hashToken(rawToken)

    await pool.query(
      `INSERT INTO user_tokens (user_id, token_hash, type, expires_at) VALUES ($1, $2, $3, NOW() + INTERVAL '1 hour')`,
      [user.id, hashedToken, 'email_verification']
    )

    await sendVerificationEmail(email, user.username, rawToken).catch(err => {
      console.log('Failed to send verification email', err)
    })

    res.status(201).json({
      success: true,
      data: user
    })

  } catch (err) {
    console.log("Registration error", err)
    res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

export const verifyEmail = async (req, res) => {

  const { token } = req.query

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Token is required"
    })
  }

  const hashedToken = hashToken(token)

  try {
    const result = await pool.query(
      `SELECT user_id FROM user_tokens
       WHERE token_hash = $1
         AND type = 'email_verification'
         AND expires_at > NOW()
         AND used_at IS NULL`,
      [hashedToken]
    )
    if (result.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification token"
      })
    }

    const userId = result.rows[0].user_id
    
    await pool.query(
      'UPDATE users SET email_verified = true WHERE id = $1',
      [userId]
    )

    await pool.query(
      'UPDATE user_tokens SET used_at = NOW() WHERE token_hash = $1', 
      [hashedToken]
    )

    res.status(200).json({
      success: true,
      message: "Email verified successfully"
    })

  } catch (err) {
    console.log("Email verification failed", err)
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
      'SELECT * FROM users WHERE email = $1 AND email_verified = TRUE',
      [email]
    )
    if (user.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials or email not verified"
      })
    }

    const userData = user.rows[0]

    const isMatch = await bcrypt.compare(password, userData.password)
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

export const logout = async (req, res) => {
  res.cookie("token", "", { ...cookieOptions, maxAge: 1 });
  res.json({ 
    message: "Logged out successfully" 
  })
}

export const resendVerification = async (req, res) => {

  const { email } = req.body
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required"
    })
  }

  try {
    const result = await pool.query(
      'SELECT id, email_verified FROM users WHERE email = $1',
      [email]
    )
    if (result.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "User not found"
      })
    }

    const user = result.rows[0]
    if (user.email_verified) {
      return res.status(400).json({
        success: false,
        message: "Email already verified"
      })
    }

    const rawToken = generateRawToken()
    const hashedToken = hashToken(rawToken)

    await pool.query(
      'DELETE FROM user_tokens WHERE user_id = $1 and type = $2', 
      [user.id, 'email_verification']
    )
    
    await pool.query(
      `INSERT INTO user_tokens (user_id, token_hash, type, expires_at) VALUES ($1, $2, $3, NOW() + INTERVAL '1 hour')`,
      [user.id, hashedToken, 'email_verification']
    )

    await sendVerificationEmail(email, rawToken).catch(err => {
      console.log('Failed to resend verification email', err)
    })

    res.status(200).json({
      success: true,
      message: "Verification email resent"
    })

  } catch (err) {
    console.log("Resend verification error", err)
    res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

export const changePassword = async (req, res) => {

  const { oldPass, newPass } = req.body
  const user_id = req.user.id

  try {
    const userResult = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [user_id]
    )
    if (userResult.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      })
    }

    const user = userResult.rows[0]

    const isMatch = await bcrypt.compare(oldPass, user.password)
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect old password"
      })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPass, salt)

    await pool.query(
      'UPDATE users SET password = $1 WHERE id = $2',
      [hashedPassword, user_id]
    )
   
    res.json({
      success: true,
      message: "Password changed successfully"
    })

  } catch (err) {
    console.log("Error changing password", err)
    res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

export const sendRecoveryEmail = async (req, res) => {

  const { email } = req.body
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required"
    })
  }

  try {
    const userResult = await pool.query(
      'SELECT id, username, email_verified FROM users WHERE email = $1',
      [email]
    )
    if (userResult.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "User not found"
      })
    }

    const user = userResult.rows[0]
    const rawToken = generateRawToken()
    const hashedToken = hashToken(rawToken)

    await pool.query(
     `INSERT INTO user_tokens (user_id, token_hash, type, expires_at)
      VALUES ($1, $2, $3, NOW() + INTERVAL '1 hour')
      ON CONFLICT (user_id, type)
      DO UPDATE SET token_hash = EXCLUDED.token_hash,
                    expires_at = EXCLUDED.expires_at,
                    used_at = NULL`,
      [user.id, hashedToken, 'password_recovery']
    )

    await sendPassRecoveryEmail(email, user.username, rawToken);

    res.status(200).json({
      success: true,
      message: "Password recovery email sent"
    })

  } catch (err) {
    console.log("Password recovery error", err)
    res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

export const verifyRecovery = async (req, res) => {

  const { token } = req.query
  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Token is required"
    })
  }

  const hashedToken = hashToken(token)

  try {
    const result = await pool.query(
      `SELECT user_id FROM user_tokens
       WHERE token_hash = $1
         AND type = 'password_recovery'
         AND expires_at > NOW()
         AND used_at IS NULL`,
      [hashedToken]
    )
    if (result.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired recovery token"
      })
    }

    const userId = result.rows[0].user_id
    const userResult = await pool.query(
      'SELECT id, username, email FROM users WHERE id = $1',
      [userId]
    )

    const user = userResult.rows[0]

    res.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      },
      message: "Token valid"
    })

  } catch (err) {
    console.log("Password recovery failed", err)
    res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

export const setNewPassword = async (req, res) => {

  const { token, newPass } = req.body
  if (!token || !newPass) {
    return res.status(400).json({
      success: false,
      message: "Token and new password required"
    })
  }

  const hashedToken = hashToken(token)
  const tokenResult = await pool.query(
    `SELECT user_id FROM user_tokens
     WHERE token_hash = $1
      AND type = 'password_recovery'
      AND expires_at > NOW()
      AND used_at IS NULL`,
    [hashedToken]
  )

  if (tokenResult.rows.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid or expired token"
    })
  }

  const userId = tokenResult.rows[0].user_id
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(newPass, salt)

  await pool.query(
    'UPDATE users SET password = $1 WHERE id = $2',
    [hashedPassword, userId]
  )

  await pool.query(
    'UPDATE user_tokens SET used_at = NOW() WHERE token_hash = $1',
    [hashedToken]
  )
  
  res.json({
    success: true,
    message: "New password set successfully"
  })
}