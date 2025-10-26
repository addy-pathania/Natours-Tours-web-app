// Middleware to sanitize incoming requests to prevent NoSQL injection and XSS attacks
const sanitizeRequest = (req, res, next) => {
  // Sanitize req.body
  if (req.body) {
    req.body = sanitize(req.body);
  }

  // Can't modify req.query in Express v5, create sanitized copy
  if (req.query && Object.keys(req.query).length > 0) {
    req.sanitizedQuery = sanitize(req.query);
    // Use req.sanitizedQuery in your controllers instead of req.query
  }

  if (req.params) {
    req.params = sanitize(req.params);
  }

  next();
};

function sanitize(obj) {
  if (typeof obj !== 'object' || obj === null) {
    // Sanitize strings for XSS
    if (typeof obj === 'string') {
      return obj
        .replace(/[<>]/g, '') // Remove < and >
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .replace(/on\w+=/gi, ''); // Remove event handlers like onclick=
    }
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(sanitize);
  }

  const sanitized = {};
  for (let [key, value] of Object.entries(obj)) {
    // Remove keys that start with $ or contain . (NoSQL injection)
    if (key.startsWith('$') || key.includes('.')) {
      continue;
    }

    // Sanitize the key itself
    key = key.replace(/[<>]/g, '');

    sanitized[key] = typeof value === 'object' ? sanitize(value) : sanitize(value);
  }
  return sanitized;
}
export default sanitizeRequest;
