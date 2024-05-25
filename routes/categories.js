const categoriesRouter = require('express').Router();

const { findAllCategories } = require('../middlewares/categories');
const { sendAllCategories } = require('../controllers/categories');

const { createCategory } = require('../middlewares/categories');
const { sendCategoryCreated } = require('../controllers/categories')

const { findCategoryById } = require('../middlewares/categories');
const { sendCategoryById } = require('../controllers/categories');

const { sendCategoryUpdated } = require("../controllers/categories");
const { updateCategory } = require("../middlewares/categories");

const { deleteCategory } = require("../middlewares/categories");
const { sendCategoryDeleted } = require('../controllers/categories');

const { checkIfCategoryExists } = require("../middlewares/categories");

const { checkEmptyName } = require("../middlewares/categories");

const { checkAuth } = require("../middlewares/auth");

categoriesRouter.get('/categories', findAllCategories, sendAllCategories);
categoriesRouter.get('/categories/:id', findCategoryById, sendCategoryById);
categoriesRouter.post(
    "/categories",
    findAllCategories,
    checkIfCategoryExists,
    checkEmptyName,
    checkAuth,
    createCategory,
    sendCategoryCreated
);

categoriesRouter.put(
    "/categories/:id",
    checkEmptyName,
    checkAuth,
    updateCategory,
    sendCategoryUpdated
);
categoriesRouter.delete('/categories/:id', checkAuth, deleteCategory, sendCategoryDeleted);

module.exports = categoriesRouter;