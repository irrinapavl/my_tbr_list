import { rateLimit } from 'express-rate-limit'

export const generalLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100,
	standardHeaders: true,
	legacyHeaders: false,
	ipv6Subnet: 48, 
})

export const resendLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
})
