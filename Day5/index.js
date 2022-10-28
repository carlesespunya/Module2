const mongoose = require("mongoose")

const MONGODB_URI = "mongodb://localhost:27017/video"

const video = async function() {
  try {
    const x = await mongoose.connect(MONGODB_URI)
    console.log( `conected to ${x.connection.name}`)
    addFilm("Superbad")
    addFilm("Superman")
    showFilms()
    showMovies()
  } catch (err) {
    console.log(err)
  }
}

const Film = mongoose.model("Film", { title: String })

const addFilm = async function(name) {
  const film = new Film({ title: name });
  try {
    const filmSaved = await film.save()
  } catch (err){
    console.log(err)
  }
}


const showFilms = async function() {
  console.log("all the films")
  try {
    const films = await Film.find()
    console.log(films)
  }catch (err) {
    console.log(err)
  }
}


const Movie = mongoose.model("Movie", { title: String })

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
