const mongoose = require("mongoose")
const Schema = mongoose.Schema

const movieSchema = new Schema({
  title: String,
  duration: String,
  year: Number
})

const Movie = mongoose.model("Movie", movieSchema)

module.exports = Movie
