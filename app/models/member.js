const client = require('../config/db');

module.exports = {
    /**
     * Récupère tout les membre sans filtre ni ordre
     * @returns - tous les posts dans la base de donnée
     */

    async findAll() {
        const result = await client.query('SELECT * FROM "member"');
        return result.rows;
    },
    /**
     * Récupère les membres par son id
     * @param {number} postId - l'id du membre souhaité
     * @returns Le membre souhaité ou undefined si aucun membre avec cet id
     */

    async findByPk(postId) {
        const result = await client.query('SELECT * FROM member JOIN member_data ON member.member_id = member_data.member_data_member_id WHERE member.member_id= $1', [postId]);
        if (result.rowCount === 0) {
            return null;
        }
        return result.rows[0];
    },
    async create(member) {
        const savedMember = await client.query(
            `
                INSERT INTO member
                (member_lastname, member_username, member_password) VALUES
                ($1, $2, $3) RETURNING *
            `,
            [member.lastname, member.username, member.password],
        );

        return savedMember.rows[0];
    },
    async isUnique(userName) {
        const isUnique = await client.query(
            `
            SELECT * FROM "member" WHERE member.member_username= $1
            `,
            [userName],
        );
        return isUnique.rows[0];
    },
    /**
     * Ajoute un membre dans la base de données
     * @param {InputPost} post - les données à insèrer
     * @returns le membre inséré
     */

    async insert(member) {
        const savedMember = await client.query(
            'SELECT * FROM insert_member($1)',
            [member],
        );
        return savedMember.rows[0];
    },

    /**
     * Modifie un membre dans la base de données
     * @param {number} id - L'id à modifier
     * @param {InputPost} member - Le membre modifié
     * @returns L'id et/ou le membre modifié
     */

    async update(update) {
        const updateMember = await client.query(
            `
            UPDATE member
             SET member_username = $1,
             member_password = $2,
             member_lastname = $3,
             member_firstname = $4,
             member_email = $5,
             WHERE member_id = $6 RETURNING *
            `,
            [update.username, update.password, update.lastname, update.firstname, update.emai],
        );
        return updateMember.rows[0];
    },

    /**
     * Supprime de la base de donnée un membre
     * @param {number} id - l'id du membre supprimé
     * @param {string} le membre supprimé
     * @returns le résultat de la suppression
     */

    async delete(memberId) {
        const deleteMember = await client.query('DELETE FROM member WHERE member_id = $1', [memberId]);
        return deleteMember.rows;
    },

    /**
     * Verifie si le membre existe déjà
     * @param le nom du inputData
     * @param {*} postId
     * @returns
     */
};
