const express = require('express');

const { todolistController: controller } = require('../../controllers/api');
const controllerHandler = require('../../helpers/controllerHandler');

const controllerHandler = require('../../helpers/controllerHandler');

const controllerJwt = require('../../middleware/jwt');

const router = express.Router();


router
    .route('/')
    .get(controllerJwt.ckeckToken, controllerHandler(controller.getAll))
    .post(controllerHandler(controller.create));

router
    .route('/:id')
    .get(controllerJwt.ckeckToken, controllerHandler(controller.read))
    .patch(controllerHandler(controller.update))
    .delete(controllerHandler(controller.delete));

router
    .route('/:id/items')
    .get(controllerJwt.ckeckToken, controllerHandler(controller.readAllItem))
    .post(controllerHandler(controller.addItem));
