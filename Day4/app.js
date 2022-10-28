const express = require("express")
const hbs = require("hbs")
const path = require("path")
const axios =  require("axios")

const app = express()

app.set("views", path.join(__dirname, "/views"))
app.set("view engine", "hbs")

app.use(express.static("public"))

hbs.registerPartials(__dirname + "/views/partials")


app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=15`)
    const pokeNameArray = response.data.results
    const pokeArray = []

    const getPokemon = async function(url, index) {
      try{
        const pokeurl = await axios.get(url)
        pokeArray.push(pokeurl.data)
        console.log("Poke added to array")
        if (index === 14) {
          console.log("---------------- rendering -----------------")
          console.log(data)

          res.render("index", data)
        }
      }catch (err){
        console.log(err)
      }
    }

    let data = {
      pokemons: pokeArray
    }

    pokeNameArray.forEach((poke, index) => {
      getPokemon(poke.url, index)

    })


    console.log(pokeArray)
  } catch (err) {
    console.log(err)
  }
})

app.get("/random", async (req, res) => {
  try{
    const random = Math.floor(Math.random() * 100) + 1
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${random}/`)
    const pokeFromApi = response.data
    console.log(pokeFromApi.types[0].type.name)
    res.render("random", pokeFromApi)
  } catch (err) {
    console.log(err)
  }
})



app.listen(3000, () => {
  console.log("server running")
})
