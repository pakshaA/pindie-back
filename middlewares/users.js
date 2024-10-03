const users = require("../models/user");
const bcrypt = require('bcryptjs');

const findAllUsers = async (req, res, next) => {
    req.usersArray = await users.find({}, { password: 0 });
    next();
};

const createUser = async (req, res, next) => {
    console.log(req, res, next)
    try {
        req.user = await users.create(req.body);
        next();
    } catch (err) {
        res.setHeader('Content-Type', 'application/json');
        res.status(400).send(JSON.stringify({ message: "Error creating user" }));
    }
};

const findUserById = async (req, res, next) => {
    try {
        req.user = await users.findById(req.params.id, { password: 0 });
        next();
    } catch (e) {
        res.setHeader('Content-Type', 'application/json');
        res.status(404).send(JSON.stringify({ message: "Error findig user" }));
    }
};

const updateUser = async (req, res, next) => {
    try {
        res.user = await users.findByIdAndUpdate(req.params.id, req.body);
        next();
    } catch (err) {
        res.setHeader('Content-Type', 'application/json');
        res.status(400).send(JSON.stringify({ message: "Error updating user" }));
    }
};

const deleteUser = async (req, res, next) => {
    try {
        req.user = await users.findByIdAndDelete(req.params.id);
        next();
    } catch (err) {
        res.setHeader('Content-Type', 'application/json');
        res.status(404).send(JSON.stringify({ message: "error deleting user" }));
    }
};

const checkEmptyNameAndEmailAndPassword = async (req, res, next) => {
    if (
        req.body.name ||
        !req.body.email ||
        !req.body.password
    ) {
        console.log(req.body.name, req.body.email, req.body.password);
        res.setHeader('Content-Type', 'application/json');
        res.status(404).send(JSON.stringify({ message: "Заполни все поля" }));
    } else {
        next();
    }
};

const checkNameAndEmail = async (req, res, next) => {
    if (
        !req.body.name ||
        !req.body.email
    ) {
        res.setHeader('Content-Type', 'application/json');
        res.status(400).send(JSON.stringify({ message: "Заполни все поля" }));
    }
};

const hashPassword = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;
        next();
    } catch (err) {
        res.status(400).send(JSON.stringify({ message: "Error while hashing password" }));
    }
};

const checkIfUserExists = async (req, res, next) => {
    const isInArray = req.usersArray.find((u) => {
        return req.body.name === u.name;
    })
    if (!isInArray) {
        res.setHeader('Content-Type', 'application/json');
        res.status(400).send(JSON.stringify({ message: "User already exists" }));
    } else {
        next();
    }
};

module.exports = {
    findAllUsers,
    createUser,
    findUserById,
    updateUser,
    deleteUser,
    checkEmptyNameAndEmailAndPassword,
    checkNameAndEmail,
    hashPassword,
    checkIfUserExists
}; 
