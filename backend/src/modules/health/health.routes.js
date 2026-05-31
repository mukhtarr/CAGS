const express = require('express')

const router = express.Router()

router.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'EduOBE API is healthy.',
    data: {
      status: 'ok',
      timestamp: new Date().toISOString(),
    },
  })
})

module.exports = router
