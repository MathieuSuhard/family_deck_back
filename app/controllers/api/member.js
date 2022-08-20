const memberDataMapper = require('../../models/member');
const { ApiError } = require('../../helpers/errorHandler');

module.exports = {
    async getAll(_, res) {
        const members = memberDataMapper.findAll();
        return res.json(members);
    },
    async getOne(req, res) {
        const member = await memberDataMapper.findByPk(req.params.id);
        if (!member) {
            throw new ApiError('member not found', { statusCode: 404 });
        }
        return res.json(member);
    },
    async create(req, res) {
        const newMember = await memberDataMapper.memberisUnique(req.body);
        if (newMember) {
            let field;
            if (newMember.member_lastname === req.body.member_lastname
        && memberDataMapper.member_firstname === req.body.body.member_firstname) {
                field = 'member_lastname, member_firstname';
            } if (newMember.member_userName === req.body.member_userName) {
                field = 'member_userName';
            } else {
                field = 'member_id';
            }
            throw new ApiError(`Member already exists with this ${field}`, { statusCode: 400 });
        }
        const savedMember = await memberDataMapper.insert(req.body);
        return res.json(savedMember);
    },
    async update(req, res) {
        const member = await memberDataMapper.findByPk(req.params.id);
        if (!member) {
            throw new ApiError('This member does not exits', { statusCode: 404 });
        }
        if (req.body.member_lastname || req.body.id) {
            const existingMember = await memberDataMapper.isUnique(req.body, req.params.id);
            if (existingMember) {
                let field;
                if (existingMember.member_lastname === req.body.member_lastname) {
                    field = 'member_lastname';
                } else {
                    field = 'id';
                }
                throw new ApiError(`Other member already exists with this ${field}`, { statusCode: 400 });
            }
        }
        const savedMember = await memberDataMapper.update(req.params.id, req.body);
        return res.json(savedMember);
    },
    async delete(req, res) {
        const member = await memberDataMapper.findByPk(req.params.id);
        if (!member) {
            throw new ApiError('this member does not exists', { statusCode: 404 });
        }
        await memberDataMapper.delete(req.params.id);
        return res.status(204).json();
    },
};
