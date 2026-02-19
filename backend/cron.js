import cron from 'node-cron'
import pool from './config/db.js'

export const startDbCleanup = () => {
  cron.schedule('0 12 * * *', async () => {

    console.log('Starting database cleanup...')

    try {
      const deletedUsers = await pool.query(
        `DELETE FROM users 
         WHERE email_verified = false 
         AND created_at < NOW() - INTERVAL '1 day'`
      )
      console.log(`Deleted ${deletedUsers.rowCount} unverified users`)

      const deletedTokens = await pool.query(
        `DELETE FROM user_tokens 
         WHERE used_at IS NOT NULL 
         OR expires_at < NOW()`
      )
      console.log(`Deleted ${deletedTokens.rowCount} used/expired tokens`)

    } catch (err) {
      console.error('Cleanup job failed', err)
    }
  })
}