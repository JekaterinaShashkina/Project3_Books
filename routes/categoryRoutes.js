/**
 * @swagger
 * tags:
 *   - name: Categories
 *     description: Book categories management
 */

const express = require('express') 
const router = express.Router() 
const categoryController = require('../controllers/categoryController') 

router.get('/categories', 
    /* #swagger.tags = ['Categories'] #swagger.description = "Get all categories"  */ 
    categoryController.getAllCategories)

router.post('/categories', 
    /* #swagger.tags = ['Categories'] #swagger.description = "Post new category" */ 
    categoryController.createCategory)



module.exports = router 