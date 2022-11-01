const express = require('express');
const router = express.Router();

const Book = require("../models/Book.model")

router.get("/", async (req, res) => {
  try {
    const dbBooks = await Book.find({display: true})
    console.log(dbBooks)
    res.render("books/books-list", { dbBooks })
  } catch (err) {
    console.log(err)
  }
})

router.get("/create", (req, res) => {
  res.render("books/books-form")
})

router.post("/create", async(req, res) => {
  try {
    const newBook = await Book.create(req.body)
    console.log("book created")
    res.redirect("/book")
  } catch (err) {
    console.log(err)
  }
})

router.get("/:bookId", async (req, res) => {
  const bookId = req.params.bookId
  try {
    const book = await Book.findById(bookId)
    console.log(book)
    res.render("books/book-details", book)
  }catch (err) {
    console.log(err)
  }
})

router.get("/:bookId/edit", async (req, res) => {
  const bookId = req.params.bookId
  try {
    const book = await Book.findById(bookId)
    res.render("books/edit-book", book)
  } catch (err) {
    console.log(err)
  }
})

router.post("/:bookId/edit", async (req, res) => {
  const book = req.body
  const bookId = req.params.bookId
  try {
    const bookDb = await Book.findByIdAndUpdate( bookId, book)
    res.redirect(`/books/${bookId}`)
  } catch (err) {
    console.log(err)
  }
})


router.post("/:bookId/delete", async (req, res) =>{
  const bookId = req.params.bookId
  try {
    const bookDb = await Book.findByIdAndUpdate(bookId, {display: false})
    console.log("book deleted")
    res.redirect("/books")
  } catch (err) {
    console.log(err)
  }
})


module.exports = router;
