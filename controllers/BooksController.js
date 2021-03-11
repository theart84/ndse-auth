const Book = require('../models/Book')
const path = require("path");

class BooksController {
  async getBooks(req, res) {
    const data = await Book.find();
    res.render('index', {
      title: 'Главная',
      books: data,
    });
  }

  async getBook(req, res) {
    const {id} = req.params;
    const book = await Book.findById(id);
    console.log(book)
    // const counter = await updateCounter(id);
    if (book) {
      res.render('view', {
        title: 'Главная',
        book
      });
    } else {
      res.status(404).redirect('error/404');
    }
  }

  createBookGet(req, res) {
    res.render('create', {
      title: 'Главная',
      book: [],
    });
  }

  async createBookPost(req, res) {
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
    let fileBook = '';
    if (req.file) {
      fileBook = req.file.path;
    }
    const book = new Book({
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
      fileBook
    });
    try {
      await book.save();
      res.status(200).redirect('/')
    } catch {
      res.status(404).redirect('error/404');
    }
  }

  async updateBookGet(req, res) {
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
    const {id} = req.params;
    const book = await Book.findById(id);
    if (book) {
      res.render('update', {
        title: book.title,
        book: book,
      });
    } else {
      res.status(404).redirect('error/404');
    }
  }

  async updateBookPost(req, res) {
    const {id} = req.params;
    const findBook = await Book.findById(id)
    let fileBook = '';
    if (req.file) {
      fileBook = req.file.path;
    } else {
      fileBook = findBook.fileBook
    }
    const book = await Book.findByIdAndUpdate(id, {...req.body, fileBook});
    if (book) {
      res.status(200).redirect(`/books/update/${id}`);
    } else {
      res.status(404).redirect('error/404');
    }
  }

  async deleteBook(req, res) {
    const {id} = req.params;
    await Book.deleteOne({_id: id})
    res.status(200).redirect('/');
  }

  async downloadBook(req, res) {
    const {id} = req.params;
    const book = await Book.findById(id).select('-__v');
    if (book) {
      const fileName = `${book.title}${path.extname(book.fileBook)}`;
      res.download(book.fileBook, fileName);
    } else {
      res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }
  }
}

module.exports = new BooksController();
