const mongoose = require("mongoose")
const Movie = require("./models/Movie.model")
const Film = require("./models/Film.model")

const MONGODB_URI = "mongodb://localhost:27017/video"

const video = async function() {
  try {
    const x = await mongoose.connect(MONGODB_URI)
    console.log( `conected to ${x.connection.name}`)
    addFilm("Superbad")
    addFilm("Superman")
    countFilms()
    // updateFilm("Superman")
    // deleteFilm("Superbad")
    // showFilms()
    // showMovies()
  } catch (err) {
    console.log(err)
  }
}

const addFilm = async function(name) {
  try {
    const film = await Film.create({ title: name, actors: ["Brad", "Angelina", "Leo"] });
  } catch (err){
    console.log(err)
  }
}


const showFilms = async function() {
  console.log("all the films")
  try {
    const films = await Film.find({title: "Superman"})
    console.log(films)
  }catch (err) {
    console.log(err)
  }
}

const countFilms = async function(title) {
  try {
    const count = await Film.countDocuments({ title: title })
    console.log(count)
  } catch(err) {
    console.log(err)
  }
}

const updateFilm = async function(title) {
  console.log("update film:")
  try {
    const film = await Film.updateOne({ title: title}, {title: "Sman"})
    console.log(film)
    showFilms()
  }catch (err) {
    console.log(err)
  }
}

const deleteFilm = async function(title) {
  console.log("delete film:")
  try {
    const film = await Film.deleteMany({title: title})
  }catch (err) {
    console.log(err)
  }
}


const showMovies = async function () {
  console.log("all the films")
  try {
    const films = await Movie.find()
    console.log(films)
  } catch (err) {
    console.log(err)
  }
}

video()
