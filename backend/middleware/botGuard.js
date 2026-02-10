const botGuard = (req, res, next) => {
    if (req.botDetection?.isBot) {
        return res.status(403).json({
            error: 'Access denied: bot detected'
        })
    }
    next()
}

export default botGuard