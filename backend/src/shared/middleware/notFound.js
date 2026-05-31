module.exports = (_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Resource not found.',
  })
}
