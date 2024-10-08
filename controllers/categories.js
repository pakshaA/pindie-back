const sendAllCategories = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(req.categoriesArray));
};

const sendCategoryCreated = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(req.category));
};

const sendCategoryById = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(req.category));
};

const sendCategoryUpdated = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).end(JSON.stringify({ message: "Updated category successfully" }));
}

const sendCategoryDeleted = (res, req) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(req.category));
}

module.exports = { sendAllCategories, sendCategoryCreated, sendCategoryById, sendCategoryUpdated, sendCategoryDeleted };