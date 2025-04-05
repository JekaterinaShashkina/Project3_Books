const express = require('express') 
const router = express.Router() 
const authController = require("../controllers/authController");
const { route } = require('./authorRoutes');
const validator = require('../config/validationBody')
const verifySignUp = require('../middleware/verifysignup')


router.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    )
    next()
})

router.post('/auth/signup', 
    /* #swagger.tags = ['User'] #swagger.description = "User sign up" #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
        username: 'string',
        email: 'email',
        password: 'password',
        }
    }*/ 
    [
        verifySignUp.checkDuplicateUsernameOrEmail,
        validator.createUserValidator
    ], 
    authController.signup)
router.post('/auth/signin', 
    /* #swagger.tags = ['User'] #swagger.description = "User sign in" #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
        username: 'string',
        password: 'password',
        }
    }*/ 
    validator.loginValidator, authController.signin)

module.exports = router 