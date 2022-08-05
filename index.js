import express from "express"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import dotenv from "dotenv"
// const dotenv = require("dotenv")
dotenv.config({ path: "./config.env" })

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

app.post("/auth/register", (req, res) => {})

app.listen(port, (err) => {
  if (err) {
    return console.log(err)
  }

  console.log("server is running")
})
