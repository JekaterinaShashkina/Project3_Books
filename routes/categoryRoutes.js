/**
 * @swagger
 * tags:
 *   - name: Categories
 *     description: Book categories management
 */

const express = require('express') 
const router = express.Router() 
const categoryController = require('../controllers/categoryController') 
const authJwt = require('../middleware/authJwt');

router.get('/categories', /*authJwt.verifyToken,*/
    /* #swagger.tags = ['Categories'] #swagger.description = "Get all categories"  */ 
    categoryController.getAllCategories)

router.post('/categories', authJwt.verifyToken, authJwt.isAdmin,
    /* #swagger.tags = ['Categories'] #swagger.description = "Post new category" #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
        name: 'string',
    }
}*/ 
    categoryController.createCategory)



module.exports = router 