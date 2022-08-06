import express from "express"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import { validationResult } from "express-validator"
import dotenv from "dotenv"
import bcrypt from "bcrypt"

// const dotenv = require("dotenv")
dotenv.config({ path: "./config.env" })
import { registerValidator } from "./validatons/auth.js"

import UserModel from "./models/User.js"

const port = process.env.PORT || 8000

//evironment variables
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
)

console.log(DB)

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB OK")
  })
  .catch((err) => console.log("DB error", err))

const app = express()

app.use(express.json())

app.post("/auth/login", async (req, res) => {
  try {
  } catch (error) {}
})

app.post("/auth/register", registerValidator, async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array())
    }

    const password = req.body.password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    })

    const user = await doc.save()

    //create token
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    )

    const { passwordHash, ...userData } = user._doc

    res.json({ ...userData, token })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Unable to register",
    })
  }
})

app.listen(port, (err) => {
  if (err) {
    return console.log(err)
  }

  console.log(`server is running on port ${port}`)
})
