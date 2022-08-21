/* eslint-disable no-tabs */
const express = require('express');

const { roleController: controller } = require('../../controllers/api');

const controllerHandler = require('../../helpers/controllerHandler');

const controllerJwt = require('../../middleware/jwt');

// Création router express
const router = express.Router();

/**
 * GET /api/role
 * @summary endpoint pour afficher tous les roles de la BDD.
 * @tags role
 * @return {object} 200 - success response - application/json
 * @example response - 200 - success response example
 * [
 *    {
 *    	"role_id": 1,
 *    	"role_label": "papa",
 *    	"role_icon": "/icone/papa.png",
 *    	"created_at": "2022-08-20T06:51:06.985Z",
 *    	"updated_at": null
 *    },
 *    {
 *    	"role_id": 2,
 *    	"role_label": "maman",
 *    	"role_icon": "/icone/maman.png",
 *    	"created_at": "2022-08-20T06:51:06.985Z",
 *    	"updated_at": null
 *    },
 *    {
 *    	"role_id": 3,
 *    	"role_label": "enfant",
 *    	"role_icon": "/icone/enfant.png",
 *    	"created_at": "2022-08-20T06:51:06.985Z",
 *    	"updated_at": null
 *    }
 * ]
 */
router
    .route('/')
    .get(controllerHandler(controller.getAll))
    .post(controllerJwt.ckeckToken, controllerHandler(controller.create));

/**
 * GET /api/role/:id
 * @summary endpoint pour afficher un roles par son ID.
 * @tags role
 * @return {object} 200 - success response - application/json
 * @example response - 200 - success response example
 * [
 *    {
 *    	"role_id": 1,
 *    	"role_label": "papa",
 *    	"role_icon": "/icone/papa.png",
 *    	"created_at": "2022-08-20T06:51:06.985Z",
 *    	"updated_at": null
 *    }
 * ]
 */
router
    .route('/:id')
    .get(controllerHandler(controller.getOne))
    .patch(controllerJwt.ckeckToken, controllerHandler(controller.update))
    .delete(controllerJwt.ckeckToken, controllerHandler(controller.delete));

module.exports = router;
