const client = require('../config/db');

module.exports = {
    async findOneName(name) {
        const result = await client.query(`
        SELECT * FROM family WHERE family_name='${name}'
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
        console.log('requete has family', AddMembreOfFamily);
        const memberOfFamily = await client.query(
            `
                INSERT INTO family_has_member
                (family_has_member_family_id, family_has_member_member_id) VALUES
                ($1, $2) RETURNING *
            `,
            [AddMembreOfFamily.familyId,
                AddMembreOfFamily.memberId,
            ],
        );

        return memberOfFamily.rows[0];
    },
};
