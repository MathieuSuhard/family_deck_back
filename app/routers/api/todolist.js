const express = require('express');

const { todolistController: controller } = require('../../controllers/api');
const controllerHandler = require('../../helpers/controllerHandler');

const controllerJwt = require('../../middleware/jwt');

const router = express.Router();

router
    .route('/')
    .get(controllerHandler(controller.getAll))
    .post(controllerHandler(controller.create));

router
    .route('/:id')
    .get(controllerHandler(controller.readOne))
    .patch(controllerHandler(controller.update))
    .delete(controllerHandler(controller.delete));

router
    .route('/:id/items')
    .get(controllerHandler(controller.readAllItem))
    .post(controllerHandler(controller.addItem));

module.exports = router;
