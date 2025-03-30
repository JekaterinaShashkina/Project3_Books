const express = require('express') 
const router = express.Router() 
const bookController = require('../controllers/bookController') 

router.post('/books', 
    /* #swagger.tags = ['Books'] #swagger.description = "Post new book"     #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
        title: 'string',
        description: 'text',
        publicationYear: 'integer',
        category: 'integer',
        authors: 'array'
        }
    }
*/ 
    bookController.createBook)

router.get('/books', 
    /* #swagger.tags = ['Books'] #swagger.description = "Get all books" */ 
    bookController.getAllBooks)

router.get('/books/:id',
    /* #swagger.tags = ['Books'] #swagger.description = "Get book by ID" */
    bookController.getBookById)

router.put('/books/:id',
    /* #swagger.tags = ['Books'] #swagger.description = "Update an existing book" #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
        title: 'string',
        description: 'text',
        publicationYear: 'integer',
        category: 'integer',
        authors: 'array'
    }
}
*/
    bookController.updateBook)

module.exports = router 