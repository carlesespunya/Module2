const express = require("express")
const hbs = require("hbs")
const app = express()
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }))

// Middleware example

// app.use(middleware)

// function middleware() {
//   console.log("using the middleware")
// }

app.set( "views", __dirname + "/views")
app.set("view engine", "hbs")

app.get("/", (req, res) => {
  res.render("index",{
    products: ["table", "sofa", "ping-pong"]
  })
})

// --- Route params ----
app.get("/products/:product", (req,res) => {
  res.render("product", req.params )
})

// ---- Query params ----
app.get("/search" ,  (req, res) => {
  res.send(req.query)
})


// --- GET FORM ----
app.get("/get-user", (req, res) => {
  res.render("user-form")
})

app.get("/display-user", (req, res)=> {
  const name = req.query.name
  const age = req.query.age
  const favouriteFood = req.query["favourite-food"]

  res.send(`
    Name : ${name},
    Age : ${age},
    Food : ${favouriteFood},
  `)
})

// --- post form ---
app.get("/login", (req,res) => {
  res.render("login")
})

app.post("/login", (req, res) => {
  const { name, password } = req.body
  res.send(`
    Name: ${name},
    Password: ${password}
  `)
})

app.listen(3000, () => {
 console.log("server running")
})
