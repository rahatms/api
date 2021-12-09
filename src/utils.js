const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title: { type: String, index: true, unique: true },
    author: String,
    published: String,
    edition: String,
    publisher: String,
})

const Book = mongoose.model("Book", BookSchema);

const connect =  () => {
    return mongoose.connect("mongodb://localhost:27017/api");
};

const connectAndStartServer = (server, port) => {
    return mongoose.connect("mongodb://localhost:27017/api").then(() => {
        console.log("Connected to database!")
        server.listen(port, () => {
            console.log(`Server listening on port:${port}`);
        })
    }).catch((err) => {
        console.log("Error Happened while starting server!\n", err);
    })
};

const getBooks = async (options = {}) => {
    const books = await Book.find(options);
    return books;
};

const createBook = async (book) => {
    const newBook = new Book(book);
    await newBook.save();
    return newBook;
};

const deleteBook = async (options = {}) => {
    if (Object.keys(options).length == 0) {
        throw Error("No delete parameter provided!");
    }
    return await Book.deleteOne(options);
};

const updateBook = async (filter, values) => {
    return await Book.updateOne(filter, values);
};

module.exports = {
    connect,
    connectAndStartServer,
    Book,
    getBooks,
    createBook,
    deleteBook,
    updateBook,
};