const express = require('express');

const { userController: controller } = require('../../controllers/api');

const controllerHandler = require('../../helpers/controllerHandler');

const controllerJwt = require('../../middleware/jwt');

// Création router express
const router = express.Router();

router
    .route('/users')
    .get(controllerHandler(controller.getAll));

router
    .route('/register')
    .post(controllerHandler(controller.register));

router
    .route('/auth')
    .post(controllerHandler(controller.login));

module.exports = router;
