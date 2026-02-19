import express from "express";
import { register, login, logout, verifyEmail, resendVerification, 
         changePassword, sendRecoveryEmail, verifyRecovery, 
         setNewPassword } from "../controllers/authController.js"
import { protect } from "../middleware/protect.js"

const router = express.Router()

router.post('/register', register)
router.get('/verify-email', verifyEmail)
router.post('/resend-verification', resendVerification)
router.post('/login', login)
router.put('/change-password', protect, changePassword)
router.post('/send-recovery-email', sendRecoveryEmail)
router.get('/verify-recovery', verifyRecovery)
router.post('/set-new-password', setNewPassword)
router.post('/logout', logout)
router.get('/me', protect, (req, res) => {
    res.json(req.user)
})

export default router