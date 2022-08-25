/* eslint-disable no-tabs */
const client = require('../config/db');

module.exports = {
    async findOneName(name) {
        const result = await client.query(`
        SELECT * FROM family WHERE family_name='${name.toUpperCase()}'
        `);
        if (result.rowCount === 0) {
            return null;
        }
        return result.rows[0];
    },
    async create(family) {
        const savedFamily = await client.query(
            `
            INSERT INTO family
            (family_name) VALUES
            ($1) RETURNING *
        `,
            [family.familyName],
        );
        return savedFamily.rows[0];
    },
    async AddMemberOfFamily(AddMembreOfFamily) {
        const memberOfFamily = await client.query(
            `
                INSERT INTO family_has_member_has_role
                (family_has_member_has_role_family_id,
                family_has_member_has_role_member_id,
                family_has_member_has_role_role_id
                 ) VALUES
                ($1, $2, $3) RETURNING *
            `,
            [AddMembreOfFamily.familyId,
                AddMembreOfFamily.memberId,
                AddMembreOfFamily.roleId,
            ],
        );

        return memberOfFamily.rows[0];
    },

    async allMembersByFamily(familyId) {
        const result = await client.query(`
        SELECT family.*, member.*, role.*, member_data.*  AS family
        FROM family_has_member_has_role
        JOIN family
            ON "family_has_member_has_role"."family_has_member_has_role_family_id" = "family"."family_id"
        JOIN member
            ON "family_has_member_has_role"."family_has_member_has_role_member_id" = "member"."member_id"
        JOIN role
            ON "family_has_member_has_role"."family_has_member_has_role_role_id" = "role"."role_id"
        JOIN member_data
            ON "member"."member_id" = "member_data"."member_data_member_id"
         WHERE family_id='${familyId}'
        `);
        if (result.rowCount === 0) {
            return null;
        }
        return result.rows[0];
    },

    async membersByFamily(colonne, data) {
        const result = await client.query(`
        SELECT family.*, member.*, role.*, member_data.*  AS family
        FROM family_has_member_has_role
        JOIN family
            ON "family_has_member_has_role"."family_has_member_has_role_family_id" = "family"."family_id"
        JOIN member
            ON "family_has_member_has_role"."family_has_member_has_role_member_id" = "member"."member_id"
        JOIN role
            ON "family_has_member_has_role"."family_has_member_has_role_role_id" = "role"."role_id"
        JOIN member_data
            ON "member"."member_id" = "member_data"."member_data_member_id"	
        WHERE ${colonne}='${data}'
        `);
        if (result.rowCount === 0) {
            return null;
        }
        return result.rows[0];
    },
};
