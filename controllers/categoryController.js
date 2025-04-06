const db = require('../config/database') 

const Category = require("../models/category")  

// GET all categories
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

// CREATE a new books category 
exports.createCategory = async (req, res) => {   
    const { name } = req.body    
    
    if (!name) {
        return res.status(400).json({ message: 'Category name is required' });
    }
    try {   
        const existing = await Category.findOne({ where: { name } });
        if (existing) {
            return res.status(409).json({ message: 'Category already exists' });
        }  
        const category = await Category.create({ name })      
        res.status(201).json(category)    
    } catch (error) {     
        console.error(error)      
        res.status(500).json({ message: 'An error occurred while creating a books category' })    
    } 
}