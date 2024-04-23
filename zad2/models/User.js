class User {
    constructor(id, login, borrowedBooks = []) {
        this.id = id;
        this.login = login;
        this.borrowedBooks = borrowedBooks;
    }

    static getAll() {
        const users = [
            new User(1, 'user 1'),
            new User(2, 'user 2'),
            new User(3, 'user 3'),
            new User(4, 'user 4'),
            new User(5, 'user 5')

        ];
    }
}

module.exports = User;