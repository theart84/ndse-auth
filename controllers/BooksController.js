const Book = require('../models/Book')
const User = require('../models/User')
const path = require("path");

class BooksController {
  async getBooks(req, res) {
    if (req.isAuth) {
      const data = await Book.find();
      res.render('index', {
        title: 'Главная',
        isLogin: true,
        books: data,
      });
    } else {
      res.redirect('/')
    }
  }

  async getBook(req, res) {
    if (req.isAuth) {
      const {id} = req.params;
      const book = await Book.findById(id);
      if (book) {
        res.render('view', {
          title: 'Главная',
          book
        });
      } else {
        res.status(404).redirect('error/404');
      }
    }
  }

  async createBookGet(req, res) {
    if (req.isAuth) {
      res.render('create', {
        title: 'Главная',
        book: [],
      });
    } else {
      res.redirect('/');
    }

  }

  async createBookPost(req, res) {
    if (req.isAuth) {
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
        res.status(200).redirect('/main')
      } catch {
        res.status(404).redirect('error/404');
      }
    } else {
      res.redirect('/');
    }
  }

  async updateBookGet(req, res) {
    if (req.isAuth) {
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
  }

  async updateBookPost(req, res) {
    if (req.isAuth) {
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
  }

  async deleteBook(req, res) {
    if (req.isAuth) {
      const {id} = req.params;
      await Book.deleteOne({_id: id})
      res.status(200).redirect('/main');
    }
  }

  async downloadBook(req, res) {
    if (req.isAuth) {
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
}

module.exports = new BooksController();
