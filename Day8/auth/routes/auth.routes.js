const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs")
const saltRounds = 10

const {isLoggedIn, isLoggedOut} = require("../middleware/route-guard.js")

const User = require("../models/User.model");
const { default: mongoose } = require('mongoose');

router.get("/signup", isLoggedOut ,(req, res) => {
  res.render("auth/signup")
})

router.post("/signup", async (req,res) => {
  console.log(req.body)
  const {username, email, password} = req.body

  if ( !username || !email || !password) {
    res.render("auth/signup", { error: "All fields must be fillled."})
    return
  }

  try {
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(password, salt)

    const userDb = await User.create({
      username ,
      email,
      password: hash
    })
    req.session.currentUser = userDb
    res.redirect("/profile")
  }catch (err) {
    console.log(err)
    if (err instanceof mongoose.Error.ValidationError) {
      res.status(500).render("auth/signup", { error: err.message })
    } else if (err.code === 11000) {
      res.status(500).render("auth/signup", { error: "The email should be unique" })
    }
  }
})

router.get("/login", isLoggedOut, (req, res) => {
  res.render("auth/login")
})

router.post("/login", async(req, res) => {
  console.log(req.session)
  const { email, password } = req.body

  if ( !email || !password) {
    res.render("auth/login", { errorMessage: "All the fields should be flled"})
    return
  }

  try {
    const userDb = await User.findOne({email})
    if (!userDb) {
      res.render("auth/login", { errorMessage: "This email is not registered, Try again" })
    } else if (bcrypt.compareSync(password, userDb.password)){
      req.session.currentUser = userDb
      console.log(userDb)
      res.render("users/user-profile", userDb)
    } else {
      res.render("auth/login", { errorMessage: "Incorrect password, Try again" })
    }
  }catch (err) {
    console.log(err)
  }

})

router.post("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err)
    } else {
      res.redirect("/")
    }
  })
})

router.get("/profile", isLoggedIn , (req, res) => {
  res.render("users/user-profile", req.session.currentUser)
})


module.exports = router;
