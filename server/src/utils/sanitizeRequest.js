// middleware/sanitize.middleware.js
const sanitizeRequest = (req, res, next) => {
  // Sanitize req.body
  if (req.body) {
    req.body = sanitizeMongoInput(req.body);
  }

  // Can't modify req.query in Express v5, create sanitized copy
  if (req.query && Object.keys(req.query).length > 0) {
    req.sanitizedQuery = sanitizeMongoInput(req.query);
    // Use req.sanitizedQuery in your controllers instead of req.query
  }

  if (req.params) {
    req.params = sanitizeMongoInput(req.params);
  }

  next();
};

function sanitizeMongoInput(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(sanitizeMongoInput);
  }

  const sanitized = {};
  for (const [key, value] of Object.entries(obj)) {
    // Remove keys that start with $ or contain . (NoSQL injection)
    if (key.startsWith('$') || key.includes('.')) {
      continue;
    }

    sanitized[key] = typeof value === 'object' ? sanitizeMongoInput(value) : value;
  }

  return sanitized;
}

export default sanitizeRequest;
