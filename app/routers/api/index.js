const express = require('express');

const userRouter = require('./user');

const roleRouter = require('./role');

const todolistRouter = require('./todolist');

const { apiController } = require('../../controllers/api');

const { ApiError } = require('../../helpers/errorHandler');

const router = express.Router();

router.use('/role', roleRouter);

router.use('/user', userRouter);

router.use('/todolist', todolistRouter);

router.all('/', apiController.home);

router.use(() => {
    throw new ApiError('API route not found', { statusCode: 404 });
});

module.exports = router;
