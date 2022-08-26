/* eslint-disable no-unused-vars */
const bcrypt = require('bcrypt');
const userDatamapper = require('../../models/user');
const familyDatamapper = require('../../models/family');
const roleDatamapper = require('../../models/role');
const memberDatamapper = require('../../models/memberdata');
const { ApiError } = require('../../helpers/errorHandler');

module.exports = {

    async allmemberAndFamily(req, res) {
        const familyId = req.params.id;
        const allMemberAndRoles = await familyDatamapper.allMembersByFamily(familyId);
        if (!allMemberAndRoles) {
            throw new ApiError('family not found', { statusCode: 404 });
        }
        return res.json(allMemberAndRoles);
    },
    async familyOne(req, res) {
        const familyId = req.params.id;
        const family = await familyDatamapper.allMembersByFamily(familyId);
        if (!family) {
            throw new ApiError('family not found', { statusCode: 404 });
        }
        const newFamily = {
            famille_id: family[0].family_id,
            nom: family[0].family_name,
            description: family[0].family_description,
        };
        return res.json(newFamily);
    },
    async familyAndOneMember(req, res) {
        const familyId = {
            familyId: req.params.idFamily,
            memberId: req.params.id,
        };
        console.log(familyId);
        const OneMember = await familyDatamapper.dataMemberByFamily(familyId);
        if (!OneMember) {
            throw new ApiError('member not found', { statusCode: 404 });
        }
        return res.json(OneMember);
    },

    async update(req, res) {
        const {
            name,
            description,
        } = req.body;
        const familyId = req.params.id;
        const family = await familyDatamapper.allMembersByFamily(familyId);
        if (!family) {
            throw new ApiError('family not found', { statusCode: 404 });
        }
        const updateFamily = await familyDatamapper.update({
            familyId,
            name,
            description,
        });
        if (!updateFamily) {
            throw new ApiError('family not found', { statusCode: 404 });
        }
        return res.json({
            msg: 'Famille modifiée !', updateFamily,
        });
    },

};
