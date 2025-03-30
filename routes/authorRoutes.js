/**
 * @swagger
 * tags:
 *   - name: Authors
 *     description: Book authors management
 */

const express = require('express') 
const router = express.Router() 
const authorController = require('../controllers/authorController') 

router.get('/authors', 
    /* #swagger.tags = ['Authors'] #swagger.description = "Get all authors"  */ 
    authorController.getAllAuthors)

router.post('/authors', 
    /* #swagger.tags = ['Authors'] #swagger.description = "Post new author" #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
        first_name: 'string',
        last_name: 'string',
    }
}*/ 
    authorController.createAuthor)

router.put('/authors/:id', 
    /* #swagger.tags = ['Authors'] #swagger.description = "Update author" #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
        first_name: 'string',
        last_name: 'string',
    }
}*/ 
    authorController.updateAuthor)

module.exports = router 