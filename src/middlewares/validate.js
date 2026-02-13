// src/middlewares/validate.js
export const validate = (schema) => (req, res, next) => {
  try {
    // Only parse the body for simplicity
    schema.parse(req.body);
    next(); // valid, continue
  } catch (err) {
    const errors = err.errors
      ? err.errors.map((e) => ({
          path: e.path.join('.'),
          message: e.message,
        }))
      : [{ path: '', message: err.message }];

    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      data: errors,
    });
  }
};
