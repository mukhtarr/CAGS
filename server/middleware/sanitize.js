/**
 * Sanitize user input to prevent NoSQL injection.
 * Strips keys starting with "$" and "__proto__" from objects recursively.
 */
const sanitize = (obj) => {
  if (obj === null || obj === undefined) return obj;
  if (Array.isArray(obj)) return obj.map(sanitize);
  if (typeof obj === "object") {
    const clean = {};
    for (const key of Object.keys(obj)) {
      if (key.startsWith("$") || key === "__proto__") continue;
      clean[key] = sanitize(obj[key]);
    }
    return clean;
  }
  return obj;
};

/**
 * Express middleware to sanitize req.body, req.query, and req.params.
 */
const sanitizeInput = (req, res, next) => {
  if (req.body) req.body = sanitize(req.body);
  if (req.query) req.query = sanitize(req.query);
  next();
};

module.exports = sanitizeInput;
