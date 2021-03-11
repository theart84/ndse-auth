const Book = require('../models/Book');

class BooksController {
  async getBooks(req, res) {
    const data = await Book.find().select('-__v');
    res.status(200).json({
      success: true,
      quantity: data.length,
      data,
    });
  }

  async getBook(req, res) {
    const {id} = req.params;
    const book = await Book.findById(id).select('-__v');
    if (book) {
      res.status(200).json({
        success: true,
        data: book,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }
  }

  async createBook(req, res) {
    const book = new Book(req.body);
    try {
      await book.save();
      res.status(201).json({
        success: true,
        data: book,
      });
    } catch {
      res.status(500).json({
        success: false,
        message: 'Internal error',
      });
    }
  }

  async updateBook(req, res) {
    const {id} = req.params;
    const findBook = await Book.findById(id).select('-__v');
    let fileBook = '';
    if (req.file) {
      fileBook = req.file.path;
    } else {
      fileBook = findBook.fileBook
    }
    await Book.updateOne({_id: id}, {$set: req.body});
    const book = await Book.findOne({_id: id}).select('-__v');
    if (book) {
      res.status(200).json({
        success: true,
        data: book,
      });

      res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }
  }

  async deleteBook(req, res) {
    const {id} = req.params;
    await Book.deleteOne({_id: id})
    res.status(200).json({
      success: true,
    });
  }
}

module.exports = new BooksController();
