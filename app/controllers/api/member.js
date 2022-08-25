const bcrypt = require('bcrypt');
const memberDataMapper = require('../../models/member');
const memberData = require('../../models/memberdata');
const memberRole = require('../../models/role');
const { ApiError } = require('../../helpers/errorHandler');

module.exports = {
    async getAll(_, res) {
        const members = await memberDataMapper.findAll();
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
        const {
            familyId,
            lastname,
            username,
            roleId,
            datebirth,
            password,
            confirmPassword,
            topsize,
            bottomsize,
            shoesize,
            size,
            school,
            hobbies,
        } = req.body;
        if (!lastname
        || !datebirth
        || !username
        || !roleId
        || !password
        || !confirmPassword
        ) {
            throw new ApiError('tous les champs sont requis', { statusCode: 400 });
        }

        if (password !== confirmPassword) {
            res.status(401).json({ msg: 'les mots de passe ne sont pas identiques !' });
            return;
        }
        if (!familyId) {
            throw new ApiError('This family does not exits', { statusCode: 404 });
        }
        const newUserName = await memberDataMapper.isUnique(username);
        if (newUserName) {
            res.status(401).json({ msg: 'Cet username est déjà utilisé' });
            return;
        } try {
            const hashPassword = await bcrypt.hash(password, 10);
            const newMember = await memberDataMapper.create({
                lastname,
                username,
                roleId,
                password: hashPassword,
            });
            const memberId = newMember.member_id;
            const memberLastname = newMember.member_lastname;
            const memberUsername = newMember.member_username;
            const newMemberData = await memberData.create({
                datebirth,
                size,
                topsize,
                bottomsize,
                shoesize,
                school,
                hobbies,
                memberId,
            });
            res.json({
                msg: 'Ajout du nouveau membre', memberId, memberLastname, newMemberData, memberUsername,
            });
        } catch (err) {
            res.json(err);
        }
    },
    async update(req, res) {
        const
            {
                lastname,
                username,
                email,
                roleId,
                datebirth,
                topsize,
                bottomsize,
                shoesize,
                size,
                school,
                hobbies,
            } = req.body;
        const { id } = req.params;
        const updateMemberData = await memberData.update({
            id,
            datebirth,
            topsize,
            bottomsize,
            shoesize,
            size,
            school,
            hobbies,
        });
        const updateMember = await memberDataMapper.update({
            id,
            email,
            lastname,
            username,
        });
        const updateMemberRole = await memberRole.udpadteRoleofMember({
            id,
            roleId,
        });
        return res.json({
            msg: 'Le membre a bien été modifié', updateMemberData, updateMember, updateMemberRole,
        });
    },
    async delete(req, res) {
        const deleteMember = await memberDataMapper.delete(req.params.id);
        if (!deleteMember) {
            throw new ApiError('this member does not exists', { statusCode: 404 });
        }
        return res.json({
            msg: 'membre supprimé', deleteMember,
        });
    },
};
