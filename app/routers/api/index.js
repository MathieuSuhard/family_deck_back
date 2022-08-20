const express = require('express');

const userRouter = require('./user');

const roleRouter = require('./role');

const { apiController } = require('../../controllers/api');

const { ApiError } = require('../../helpers/errorHandler');

const router = express.Router();

router.use('/role', roleRouter);

router.use('/user', userRouter);

router.all('/', apiController.home);

router.use(() => {
    throw new ApiError('API route not found', { statusCode: 404 });
});

module.exports = router;
