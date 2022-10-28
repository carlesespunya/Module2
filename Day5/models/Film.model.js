const mongoose = require("mongoose")
const Schema = mongoose.Schema

const filmSchema = new Schema ({
    title: {
      type: String,
      required: true,
      unique: true
    },
    duration: {
      type: Number,
      min: 60,
      max: 180
    },
    genre: {
      type: String,
      enum: ["Drama", "Comedy"]
    },
    actors: {
      type: [String]
    },
    location: {
      address: String,
      city: String
    },
    year: Number,
    url: {
      type: String,
      default: ""
    }
}, { timestamps: true })

const Film = mongoose.model("Film", filmSchema)

module.exports = Film
