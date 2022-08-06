import { body } from "express-validator"

export const registerValidator = [
  body("email", "Invalid email format").isEmail(),
  body("password", "Password must be as min as 5 symbols").isLength({ min: 5 }),
  body("fullName", "Name is required").isLength({ min: 3 }),
  body("avatarUrl", "Incorrect url").optional().isURL(),
]
