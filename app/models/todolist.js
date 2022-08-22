const client = require('../config/db');

module.exports = {

    async findAll() {
        const result = await client.query('SELECT * FROM todolist');
        return result.rows;
    },

    async findByPk(todolistId) {
        const result = await client.query('SELECT * FROM todolist WHERE todolist_id = $1', [todolistId]);

        if (result.rowCount === 0) {
            return null;
        }
        return result.rows[0];
    },

    async findByPkAllItems(todolistId) {
        const result = await client.query('SELECT todolist.*, item.* FROM item JOIN todolist ON item.todolist_id = todolist.todolist_id WHERE todolist.todolist_id = $1', [todolistId]);

        if (result.rowCount === 0) {
            return null;
        }
        return result.rows;
    },

    async findByFamily(familyId) {
        const result = await client.query('SELECT * FROM todolist WHERE todolist_id = $1', [familyId]);

        if (result.rowCount === 0) {
            return null;
        }
        return result.rows;
    },

    async create(todolist) {
        const savedTodolist = await client.query(
            `
                INSERT INTO todolist
                ("todolist_title", "todolist_color", "member_id") VALUES
                ($1, $2, $3) RETURNING *
            `,
            [todolist.title, todolist.color, todolist.memberId],
        );

        return savedTodolist.rows[0];
    },
    /* je suis la */
    async update(update) {
        const updateTodolist = await client.query(
            `
            UPDATE todolist
            SET todolist_title = $1,
             todolist_color = $2,
             todolist_position = $3,
             todolist_status = $4,
            WHERE todolist_id = $5 RETURNING *
            `,
            [update.title, update.icon, update.id],
        );
        return updateTodolist.rows[0];
    },

    async delete(roleId) {
        const result = await client.query('DELETE FROM role WHERE role_id = $1 RETURNING *', [roleId]);

        if (result.rowCount === 0) {
            return null;
        }
        return result.rows[0];
    },

    async AddRoleOfMember(AddRoleOfMember) {
        const RoleOfMember = await client.query(
            `
                INSERT INTO member_has_role
                (member_has_role_member_id, member_has_role_role_id) VALUES
                ($1, $2) RETURNING *
            `,
            [AddRoleOfMember.memberId,
                AddRoleOfMember.roleId,
            ],
        );

        return RoleOfMember.rows[0];
    },
};
