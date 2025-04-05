const express = require('express') 
const router = express.Router() 
const authJwt = require('../middleware/authJwt');
const bookController = require('../controllers/bookController') 

router.post('/books', 
    authJwt.verifyToken, authJwt.isAdmin,
    /* #swagger.tags = ['Books'] #swagger.description = "Post new book"      
    #swagger.security = [{ "Bearer": [] }]    
    #swagger.parameters['body'] = {
  in: 'body',
  required: true,
  schema: {
    title: 'string',
    description: 'text',
    publicationYear: 1999,
    category: 1,
    authors: [1, 2]
  }
}
*/ 
    bookController.createBook)

router.get('/books', authJwt.verifyToken,
    /* #swagger.tags = ['Books'] #swagger.description = "Get all books" */ 
    bookController.getAllBooks)

router.get('/books/:id', authJwt.verifyToken,
    /* #swagger.tags = ['Books'] #swagger.description = "Get book by ID" */
    bookController.getBookById)

router.put('/books/:id', authJwt.verifyToken, authJwt.isAdmin,
    /* #swagger.tags = ['Books'] #swagger.description = "Update an existing book" #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
        title: 'string',
        description: 'text',
        publicationYear: 1999,
        category: 1,
        authors: [1, 2]
    }
}
*/
    bookController.updateBook)

router.delete('/books/:id', authJwt.verifyToken, authJwt.isAdmin,
        /* #swagger.tags = ['Books'] #swagger.description = "Delete an existing book" */
        bookController.deleteBook)

module.exports = router 