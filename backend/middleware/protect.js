import jwt from "jsonwebtoken";
import pool from "../config/db.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await pool.query(
      "SELECT id, username, email FROM users WHERE id = $1",
      [decoded.id]
    )

    if (user.rows.length === 0) {
      return res.status(401).json({ message: "Not authorized, user not found" })
    }

    req.user = user.rows[0]
    next()

  } catch (err) {
    console.error("JWT verification failed", err.message)
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    res.status(401).json({ message: "Not authorized, token failed" })
  }
}