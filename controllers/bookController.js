const db = require('../config/database') 
const {Book, Author, Category, Comment, User} = require("../models")  

// Get all books
exports.getAllBooks = async (req, res) => {   
    try { 
        const books = await Book.findAll({
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['categoryId', 'name']
                },
                {
                    model: Author,
                    attributes: ['authorId', 'first_name', 'last_name'],
                    through: { attributes: [] }
                }
            ],
        })      
        res.status(200).json({
            books
        })    
    } catch (error) {     
        console.error(error)      
        res
        .status(500)
        .json({ message: 'An error occurred while fetching books' })    
    } 
}

// GET book by ID
exports.getBookById = async(req, res) => {
    const { id } = req.params
    try {
        const book = await Book.findByPk(id, {
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['categoryId', 'name']
                },
                {
                    model: Author,
                    attributes: ['authorId', 'first_name', 'last_name'],
                    through: { attributes: [] }
                },
                {
                    model: Comment,
                    as: 'comment',
                    attributes: ['body'],
                    include: [
                        {
                            model: User,
                            as: 'user',
                            attributes: ['username']
                        }
                    ]
                }

            ]
        })      
        if (!book) {       
            return res.status(404).json({ message: `Book with ${id} not found` })      
        }     
        res.status(200).json(book)  
    } catch (error) {
        
    }

}

// POST new book
exports.createBook = async (req, res) => {   
    const { title, description, publicationYear, category, authors } = req.body    
    try {     
        // Add category if it is
        const categoryEntry = await Category.findByPk(category)
        const book = await Book.create({ 
            title, 
            description, 
            publicationYear,
            category_id: categoryEntry.categoryId
        })

        // Add authors if it is
        if (authors && Array.isArray(authors) && authors.length > 0) {
            await book.setAuthors(authors);
        }      
        res.status(201).json(book)    
    } catch (error) {     
        console.error(error)      
        res.status(500).json({ message: 'An error occurred while creating a book' })    
    } }

// Update book info
exports.updateBook = async (req, res) => {   
    const { id } = req.params    
    const { title, description, publicationYear, category, authors } = req.body    
    try {     
        const book = await Book.findByPk(id)      
        if (!book) {       
            return res.status(404).json({ message: 'Book not found' })      
        } 
        const categoryEntry = await Category.findByPk(category);
        if (!categoryEntry) {
            return res.status(400).json({ message: 'Category not found' });
        }
        book.category_id = categoryEntry.categoryId;
        await book.update({ 
            title, 
            description, 
            publicationYear,
            category_id: categoryEntry.categoryId
        })     
        if (authors && Array.isArray(authors)) {
            await book.setAuthors(authors);
            console.log('Authors updated:', authors);
        } 
        res.status(200).json({ message: "Book succesfully updated", book})    
    } catch (error) {     
        console.error("Error updating", error)      
        res.status(500).json({ message: 'An error occurred while updating book' })    
    } } 

// DELETE book by ID
exports.deleteBook = async (req, res) => {
    const { id } = req.params    
    try {     
        const book = await Book.findByPk(id)      
        if (!book) {       
            return res.status(404).json({ message: 'Book not found' })      
        } 
        await book.setAuthors([]);
        
        await book.destroy()      
        res.status(204).json()    
    } catch (error) {     
        console.error(error)      
        res.status(500).json({ message: 'An error occurred while deleting book' })    
    } 
}