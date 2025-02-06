const { z } = require("zod");

// Signup Schema
const signupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Signin Schema
const signinSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(),
});

// Middleware for validation
const validateSignup = (req, res, next) => {
  try {
    signupSchema.parse(req.body);
    next();
  } catch (error) {
    return res
      .status(400)
      .json({ message: error.errors.map((err) => err.message) });
  }
};

const validateSignin = (req, res, next) => {
  try {
    signinSchema.parse(req.body);
    next();
  } catch (error) {
    return res
      .status(400)
      .json({ message: error.errors.map((err) => err.message) });
  }
};

module.exports = { validateSignup, validateSignin };
