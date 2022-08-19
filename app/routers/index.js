const express = require('express');

const apiRouter = require('./api');
const websiteRouter = require('./website');
const { userController: controller } = require('../controllers/api');

const { errorHandler } = require('../helpers/errorHandler');

const router = express.Router();

router.use('/api', apiRouter);

router
    .route('/test')
    .get(controller.getAll);

router.use('/', websiteRouter);
router.use(errorHandler);

module.exports = router;
