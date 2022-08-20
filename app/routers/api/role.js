const express = require('express');

const { roleController: controller } = require('../../controllers/api');

const controllerHandler = require('../../helpers/controllerHandler');

const controllerJwt = require('../../middleware/jwt');

// Création router express
const router = express.Router();

router
    .route('/')
    .get(controllerHandler(controller.getAll))
    .post(controllerJwt.ckeckToken, controllerHandler(controller.create));

router
    .route('/:id')
    .get(controllerJwt.ckeckToken, controllerHandler(controller.getOne))
    .patch(controllerHandler(controller.update))
    .delete(controllerJwt.ckeckToken, controllerHandler(controller.delete));

module.exports = router;
