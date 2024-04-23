const User = require('../models/User');
const Book = require('../models/Book');

const getBookDetails = (req, res) => {
    const userId = req.session.userId;
    const bookId = req.params.id;
    const user = User.getAll().find(user => user.id === userId);
    const book = Book.getAll().find(book => book.id === parseInt(bookId));
    const didUserBorrowTheBook = user.findBorrowedBookById(parseInt(bookId));
    res.render('book-details', { title: 'Book Details', book, didUserBorrowTheBook });
};

const postBookBorrow = (req, res) => {
    const userId = req.session.userId;
    const bookId = req.params.id;
    const user = User.getAll().find(user => user.id === userId);
    const book = Book.getAll().find(book => book.id === parseInt(bookId));
    if (user && book && book.available) {
        book.borrow();
        user.borrowBook(book);
        res.redirect('/books/borrow/success');
    } else {
        res.redirect('/');
    }
};

const getBookBorrowSuccess = (req, res) => {
    res.render('success', { title: 'Success', message: 'Book borrowed successfully' });
};

const postBookReturn = (req, res) => {
    const userId = req.session.userId;
    const bookId = req.params.id;
    const user = User.getAll().find(user => user.id === userId);
    const book = Book.getAll().find(book => book.id === parseInt(bookId));
    if (user && book && !book.available) {
        book.return();
        user.returnBook(parseInt(bookId));
        res.redirect('/books/return/success');
    } else {
        res.redirect('/');
    }
};

const getBookReturnSuccess = (req, res) => {
    res.render('success', { title: 'Success', message: 'Book returned successfully' });
};

module.exports = {
    getBookDetails,
    postBookBorrow,
    getBookBorrowSuccess,
    postBookReturn,
    getBookReturnSuccess
};