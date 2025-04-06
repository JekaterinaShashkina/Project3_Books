const express = require('express') 
const router = express.Router() 
const authJwt = require('../middleware/authJwt');
const commentController = require('../controllers/commentController') 

router.post('/comments/:bookId', authJwt.verifyToken, /*#swagger.tags = ['Comments'] #swagger.description = "Post new comment" #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    schema: {
    body: 'string',
    }
}*/
    commentController.createComment
)
router.get('/comments', authJwt.verifyToken, /*#swagger.tags = ['Comments'] #swagger.description = "Get all comments"*/
    commentController.getAllComments
)

module.exports = router 