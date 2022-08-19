const express = require('express');

const apiRouter = require('./api');
const websiteRouter = require('./website');
const { userController: controller } = require('../controllers/api');

const { errorHandler } = require('../helpers/errorHandler');

const router = express.Router();

router.use('/api', apiRouter);
router.use('/', websiteRouter);
router
    .route('/test')
    .get(controller.getAll);
router.use(errorHandler);

module.exports = router;
