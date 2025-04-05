const express = require('express') 
const router = express.Router() 
const authJwt = require('../middleware/authJwt');
const searchController = require('../controllers/searchController') 


router.get('/search/title/:title', authJwt.verifyToken, /*#swagger.tags = ['Search'] #swagger.description = "Search books by title"*/
    searchController.searchBooksByTitle
)
router.get('/search/author/:author', authJwt.verifyToken, /*#swagger.tags = ['Search'] #swagger.description = "Search books by author"*/
    searchController.searchBooksByAuthor
)
router.get('/search/category/:category_id', authJwt.verifyToken, /*#swagger.tags = ['Search'] #swagger.description = "Search books by category id"*/
    searchController.searchBooksByCategory
)
module.exports = router 