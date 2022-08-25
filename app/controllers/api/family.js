/* eslint-disable no-unused-vars */
const bcrypt = require('bcrypt');
const userDatamapper = require('../../models/user');
const familyDatamapper = require('../../models/family');
const roleDatamapper = require('../../models/role');
const memberDatamapper = require('../../models/memberdata');
const { ApiError } = require('../../helpers/errorHandler');

module.exports = {

    async memberByFamily(req, res) {
        const memberId = req.params.id;
        const familyMember = await familyDatamapper.memberByFamily(memberId);
        if (!familyMember) {
            throw new ApiError('family not found', { statusCode: 404 });
        }
        return res.json(familyMember);
    },
    async familyWithMemberAndRoles(req, res) {
        const memberId = req.params.id;
        const allMemberAndRoles = await familyDatamapper.familyByPk(memberId);
        if (!allMemberAndRoles) {
            throw new ApiError('family not found', { statusCode: 404 });
        }
        return res.json(allMemberAndRoles);
    },

};
