const db = require('../config/database') 

const Category = require("../models/category")  

exports.getAllCategories = async (req, res) => {   

    try {     
        const categories = await Category.findAll()      
        res.status(200).json(categories)    
    } catch (error) {     
        console.error(error)      
        res
        .status(500)
        .json({ message: 'An error occurred while fetching books categories' })    
    } }  

// Create a new books category 
exports.createCategory = async (req, res) => {   
    const { name } = req.body    
    try {     
        const category = await Category.create({ name })      
        res.status(201).json(category)    
    } catch (error) {     
        console.error(error)      
        res.status(500).json({ message: 'An error occurred while creating a books category' })    
    } 
}