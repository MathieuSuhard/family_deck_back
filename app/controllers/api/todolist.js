const todolistDatamapper = require('../../models/todolist');

const { ApiError } = require('../../helpers/errorHandler');

module.exports = {
    async getAll(_, res) {
        const todolists = await todolistDatamapper.findAll();
        return res.json(todolists);
    },
    async readOne(req, res) {
        const todolist = await todolistDatamapper.findByPk(req.params.id);
        if (!todolist) {
            throw new ApiError('todolis not found', { statusCode: 404 });
        }
        return res.json(todolist);
    },

    async readAllItem(req, res) {
        const todolistAndItems = await todolistDatamapper.findByPkAllItems(req.params.id);
        if (!todolistAndItems) {
            throw new ApiError('todolis not found', { statusCode: 404 });
        }
        return res.json(todolistAndItems);
    },

    async delete(req, res) {
        const deleteTodolist = await todolistDatamapper.delete(req.params.id);
        if (!deleteTodolist) {
            throw new ApiError('role not found', { statusCode: 404 });
        }
        return res.json({
            msg: 'todolist supprimée !', deleteTodolist,
        });
    },

};
