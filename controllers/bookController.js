const db = require('../config/database') 

const {Book, Author, Category} = require("../models")  


// Get all movies with pagination
exports.getAllBooks = async (req, res) => {   
    try { 
        // let { page = 1, limit = 10, sortBy = "film_id", order = "asc" } = req.query;
        
        // const allowedSortFields = ['title', 'release_year', 'rating', 'film_id'];
        // if (!allowedSortFields.includes(sortBy)) sortBy = 'film_id';

        // order = order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

        // page = Math.max(parseInt(page), 1);
        // limit = Math.max(parseInt(limit), 1);
        // const offset = (page - 1) * limit;
        
        const books = await Book.findAll({
            // limit,
            // offset,
            // order: [[sortBy, order]],
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
            // totalFilms: count,
            // totalPages: Math.ceil(count / limit),
            // currentPage: page,
            books
        })    
    } catch (error) {     
        console.error(error)      
        res
        .status(500)
        .json({ message: 'An error occurred while fetching books' })    
    } 
}

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
        console.log("book instance methods:", Object.getOwnPropertyNames(Object.getPrototypeOf(book)));

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