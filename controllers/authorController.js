const db = require('../config/database') 

const Author = require("../models/author")  

exports.getAllAuthors = async (req, res) => {   

    try {     
        const authors = await Author.findAll()      
        res.status(200).json(authors)    
    } catch (error) {     
        console.error(error)      
        res
        .status(500)
        .json({ message: 'An error occurred while fetching books authors' })    
    } }  

// Create a new books author
exports.createAuthor = async (req, res) => {   
    const { first_name, last_name } = req.body    
    try {     
        const author = await Author.create({ 
            firstName: first_name,
            lastName: last_name
        })   
 
        res.status(201).json(author)    
    } catch (error) {     
        console.error(error)      
        res.status(500).json({ message: 'An error occurred while creating the books author' })    
    } 
}

// Update books author information 
exports.updateAuthor = async (req, res) => {   
    const { id } = req.params    
    const { first_name, last_name } = req.body    
    try {     
        const author = await Author.findByPk(id)      
        if (!author) {       
            return res.status(404).json({ message: 'Author not found' })      
        }     await author.update ({ 
                firstName: first_name, 
                lastName: last_name, 
                last_update: new Date() 
        })      
        res.status(200).json(author)    
    } catch (error) {     
        console.error(error)      
        res.status(500).json({ message: 'An error occurred while updating author' })    
    } }  