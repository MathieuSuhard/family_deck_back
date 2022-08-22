const userController = require('./user');
const roleController = require('./role');
const todolistController = require('./todolist');

const apiController = {
    home(req, res) {
        const fullUrl = `${req.protocol}://${req.get('host')}`;
        return res.json({
            documentation_url: `${fullUrl}${process.env.API_DOCUMENTATION_ROUTE}`,
        });
    },
};

module.exports = { apiController, userController, roleController, todolistController };
