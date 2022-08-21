const client = require('../config/db');

module.exports = {

    async findAll() {
        const result = await client.query('SELECT * FROM "member"');
        return result.rows;
    },

    async findByPk(postId) {
        const result = await client.query('SELECT * FROM "member" WHERE id = $1', (postId));
        if (result.rowCount === 0) {
            return null;
        }
        return result.rows[0];
    },

    async insert(member) {
        const savedMember = await client.query(
            'SELECT * FROM insert_member($1)',
            [member],
        );
        return savedMember.rows[0];
    },

    async update(id, member) {
        const savedMember = await client.query(
            'SELECT * FROM update_member($1,$2)',
            [id, member],
        );
        return savedMember.rows[0];
    },

    async delete(id) {
        const result = await client.query('DELETE FROM post WHERE member = $1, $2', [id]);
        return !!result.rowCount;
    },

    async memberisUnique(firstName, lastName) {
        const preparedQuery = {
            text: 'SELECT * FROM member($1,$2)',
            values: [{ firstName, lastName }],
        };
        const result = await client.query(preparedQuery);
        return result.rows[0].member;
    },
    async userNameisUnique(userName) {
        const preparedQueryUserName = {
            text: 'SELECT * FROM member($1)',
            values: [{ userName }],
        };
        const result = await client.query(preparedQueryUserName);
        return result.rows[0].member;
    },
};
