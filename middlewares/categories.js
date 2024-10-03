const categories = require('../models/category');

const findAllCategories = async (req, res, next) => {
    req.categoriesArray = await categories.find({});
    next();
};

const createCategory = async (req, res, next) => {
    try {
        req.game = await categories.create(req.body);
        next();
    } catch (err) {
        res.setHeader('Content-Type', 'application/json');
        res.status(400).send(JSON.stringify({ message: "Error creating category" }));
    }
};

const findCategoryById = async (req, res, next) => {
    try {
        req.category = await categories.findById(req.params.id);
        next();
    } catch (e) {
        res.setHeader("Content-Type", "application/json");
        res.status(404).send(JSON.stringify({ message: "Error creating category" }));
    }
};

const updateCategory = async (req, res, next) => {
    try {
        req.category = await category.findByIdAndUpdate(req.params.id, req.body);
        next();
    } catch (err) {
        res.setHeader('Content-Type', 'application/json');
        res.status(400).send(JSON.stringify({ message: "Error updating category" }));
    }
};

const deleteCategory = async (req, res, next) => {
    try {
        req.category = await categories.findByIdAndDelete(req.params.id);
        next();
    } catch (err) {
        res.setHeader('Content-Type', 'application/json');
        res.status(404).send(JSON.stringify({ message: "error deleting category" }));
    }
};

const checkIfCategoryExists = async (req, res, next) => {
    const isInArray = req.categoriesArray.find((c) => {
        return req.body.name === c.name;
    })
    if (isInArray) {
        res.setHeader('Content-Type', 'application/json');
        res.status(400).send(JSON.stringify({ message: "Category already exists" }));
    } else {
        next();
    }
};

const checkEmptyName = async (req, res, next) => {
    if (!req.body.title) {
        res.setHeader('Content-Type', 'application/json');
        res.status(404).send(JSON.stringify({ message: "No category title" }));
    } else {
        next();
    }
};
// 
module.exports = { findAllCategories, createCategory, findCategoryById, updateCategory, deleteCategory, checkIfCategoryExists, checkEmptyName };