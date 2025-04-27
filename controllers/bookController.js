const db = require('../config/database') 
const {Book, Author, Category, Comment, User} = require("../models")  
const { validationResult } = require('express-validator');
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

// GET book by ID with authors, category and users comments
exports.getBookById = async(req, res) => {
    const { id } = req.params
    if (!id || isNaN(id)) {
        return res.status(400).json({ message: "Invalid or missing book ID" });
    }

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
    const { title, description, publicationYear, category, authors, cover_url, file_url } = req.body    
    try {   
        if (!title || !category) {
            return res.status(400).json({ message: 'Title and category are required' });
        }  
        // Add category if it is
        const categoryEntry = await Category.findByPk(category)
        if (!categoryEntry) {
            return res.status(400).json({ message: 'Category not found' });
        }
        const book = await Book.create({ 
            title, 
            description, 
            publicationYear,
            category_id: categoryEntry.categoryId,
            cover_url,
            file_url
        })

        // Add authors if it is
        if (authors && Array.isArray(authors) && authors.length > 0) {
            const validAuthors = await Author.findAll({ where: { authorId: authors } });
            if (validAuthors.length !== authors.length) {
                return res.status(400).json({ message: 'One or more authors not found' });
            }

            await book.setAuthors(authors);
        }      
        res.status(201).json(book)    
    } catch (error) {     
        console.error(error)      
        res.status(500).json({ message: 'An error occurred while creating a book' })    
    } }

// Update book info
exports.updateBook = async (req, res) => {   
    const { id } = req.params;    
    const { title, description, publicationYear, category, authors, cover_url, file_url } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {     
        const book = await Book.findByPk(id);      
        if (!book) {       
            return res.status(404).json({ message: 'Book not found' });      
        } 

        const updatedFields = {};

        if (title !== undefined) updatedFields.title = title;
        if (description !== undefined) updatedFields.description = description;
        if (publicationYear !== undefined) updatedFields.publicationYear = publicationYear;
        if (category !== undefined) updatedFields.category_id = category;
        if (cover_url !== undefined) updatedFields.cover_url = cover_url;
        if (file_url !== undefined) updatedFields.file_url = file_url;

        await book.update(updatedFields);

        if (authors && Array.isArray(authors)) {
            const validAuthors = await Author.findAll({ where: { authorId: authors } });
            if (validAuthors.length !== authors.length) {
                return res.status(400).json({ message: 'One or more authors not found' });
            }
            await book.setAuthors(authors);
            console.log('Authors updated:', authors);
        }

        res.status(200).json({ message: "Book successfully updated", book });    
    } catch (error) {     
        console.error("Error updating", error);      
        res.status(500).json({ message: 'An error occurred while updating book' });    
    }
};


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
        res.status(204).send()   
    } catch (error) {     
        console.error(error)      
        res.status(500).json({ message: 'An error occurred while deleting book' })    
    } 
}