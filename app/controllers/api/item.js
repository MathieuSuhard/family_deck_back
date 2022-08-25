/*   je suis la   */

const itemDatamapper = require('../../models/item');

const { ApiError } = require('../../helpers/errorHandler');

module.exports = {
    async getAll(_, res) {
        const items = await itemDatamapper.findAll();
        return res.json(items);
    },
    async readOne(req, res) {
        const item = await itemDatamapper.findByPk(req.params.id);
        if (!item) {
            throw new ApiError('item not found', { statusCode: 404 });
        }
        return res.json(item);
    },
    async update(req, res) {
        const {
            title,
            color,
            deadline,
        } = req.body;
        const { id } = req.params;
        const item = await itemDatamapper.findByPk(id);
        if (!item) {
            throw new ApiError('item not found', { statusCode: 401 });
        }
        const updateTodolist = await itemDatamapper.update({
            id,
            title,
            color,
            deadline,
        });
        return res.json({
            msg: 'item modifié !', updateTodolist,
        });
    },
    async delete(req, res) {
        const deleteTodolist = await itemDatamapper.delete(req.params.id);
        if (!deleteTodolist) {
            throw new ApiError('item not found', { statusCode: 404 });
        }
        return res.json({
            msg: 'item supprimé !', deleteTodolist,
        });
    },

};
