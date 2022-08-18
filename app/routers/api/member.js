const express = require('express');

const { memberController: controller } = require('../../controllers/api');

const controllerHandler = require('../../helpers/controllerHandler');

const controllerJwt = require('../../middleware/jwt');

const router = express.Router();

// router CRUD  membre par ID

router
    .route('/:id')
    .get(controllerJwt.ckeckToken, controllerHandler(controller.read))
    .patch(controllerJwt.ckeckToken, controllerHandler(controller.update))
    .delete(controllerJwt.ckeckToken, controllerHandler(controller.delete));

// router CRUD  membre data par ID

router
    .route('/:id/memberdata')
    .get(controllerJwt.ckeckToken, controllerHandler(controller.getAll))
    .post(controllerJwt.ckeckToken, controllerHandler(controller.getAll))
    .patch(controllerJwt.ckeckToken, controllerHandler(controller.getAll))
    .delete(controllerJwt.ckeckToken, controllerHandler(controller.getAll));

// router Read du dashboard du member

router
    .route('/:id/home')
    .get(controllerJwt.ckeckToken, controllerHandler(controller.getAll));

// router RU de la family du member

router
    .route('/:id/family/:id')
    .get(controllerJwt.ckeckToken, controllerHandler(controller.getAll))
    .patch(controllerJwt.ckeckToken, controllerHandler(controller.getAll));

module.exports = router;
