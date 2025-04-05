const db = require("../config/database");
const models = require("../models")

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        const userByUsername = await models.User.findOne({
            where: { username: req.body.username }
        });

        if (userByUsername) {
            return res.status(400).send({
            message: "Failed! Username is already in use!"
        });
        }

        const userByEmail = await models.User.findOne({
            where: { email: req.body.email }
        });

        if (userByEmail) {
            return res.status(400).send({
            message: "Failed! Email is already in use!"
            });
        }

        next(); 
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

// const checkRoleExisted = (req, res, next) => {
//     if (req.body.role) {
//         const role = models.Role.findAll({ where: { name: req.body.role } });
//         if (!role) {
//         res.status(400).send({
//             message: "Failed! Role does not exist = " + req.body.roles[i]
//         });
//         return;
//         }
//     }

//     next();
// };

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
//   checkRoleExisted: checkRoleExisted
};

module.exports = verifySignUp;