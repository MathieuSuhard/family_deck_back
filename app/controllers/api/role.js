const roleDatamapper = require('../../models/role');

const { ApiError } = require('../../helpers/errorHandler');

module.exports = {
    async getAll(_, res) {
        const roles = await roleDatamapper.findAll();
        return res.json(roles);
    },
    async getOne(req, res) {
        const role = await roleDatamapper.findByPk(req.params.id);
        if (!role) {
            throw new ApiError('role not found', { statusCode: 404 });
        }
        return res.json(role);
    },
    async create(req, res) {
        const {
            label,
            icon,
        } = req.body;
        if (!label || !icon
        ) {
            res.status(401).json({ msg: 'Tous les champs sont requis !' });
            return;
        }
        const role = await roleDatamapper.findOneLabel(label);
        if (role) {
            res.status(401).json({ msg: 'Le label est déjà utilisé !' });
            return;
        }
        const newRole = await roleDatamapper.create({
            label,
            icon,
        });
        res.json({
            msg: 'Role créer', newRole,
        });
    },

    async update(req, res) {
        const {
            label,
            icon,
        } = req.body;
        const { id } = req.params;

        console.log('body', req.body);

        const role = await roleDatamapper.findByPk(id);
        console.log('role', role);
        if (!role) {
            throw new ApiError('role not found', { statusCode: 401 });
        }
        const updateRole = await roleDatamapper.update({
            id,
            label,
            icon,
        });
        return res.json({
            msg: 'Role modifier', updateRole,
        });
    },
    async delete(req, res) {
        const deleteRole = await roleDatamapper.delete(req.params.id);
        if (!deleteRole) {
            throw new ApiError('role not found', { statusCode: 404 });
        }
        return res.json({
            msg: 'Role supprimé', deleteRole,
        });
    },

};
