const usersRouter = require('express').Router();

const { findAllUsers } = require('../middlewares/users');
const { sendAllUsers } = require('../controllers/users');

const { createUser } = require('../middlewares/users');
const { sendUserCreated } = require('../controllers/users');

const { findUserById } = require('../middlewares/users');
const { sendUserById } = require('../controllers/users');

const { updateUser } = require('../middlewares/users');
const { sendUserUpdated } = require("../controllers/users");

const { deleteUser } = require('../middlewares/users');
const { sendUserDeleted } = require("../controllers/users")

const { checkEmptyNameAndEmailAndPassword } = require('../middlewares/users');
const { checkNameAndEmail } = require('../middlewares/users');
const { checkIfUserExists } = require('../middlewares/users');

const { hashPassword } = require('../middlewares/users');

const { checkAuth } = require('../middlewares/auth');

const { sendMe } = require('../controllers/users');

usersRouter.get('/users', findAllUsers, sendAllUsers);
usersRouter.get('/users/:id', findUserById, sendUserById);
usersRouter.get('/me', checkAuth, sendMe)
usersRouter.post(
    "/users",
    findAllUsers,
    checkIfUserExists,
    checkEmptyNameAndEmailAndPassword,
    checkAuth,
    hashPassword,
    createUser,
    sendUserCreated
);

usersRouter.put(
    "/users/:id",
    checkNameAndEmail,
    checkAuth,
    updateUser,
    sendUserUpdated
);
usersRouter.delete('/users/:id', checkAuth, deleteUser, sendUserDeleted);

module.exports = usersRouter;