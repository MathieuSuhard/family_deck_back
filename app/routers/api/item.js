const express = require('express');

const { itemController: controller } = require('../../controllers/api');

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
