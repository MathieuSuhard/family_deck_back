const client = require('../config/db');

/**
 * @typedef {objet} post

 * @property {number} id - identifiant unique, Pk de la table
 * @property {string} member_lastname - prénom du membre
 * @property {string} member_firstname - nom de famille du membre
 * @property {string} member_email - email du membre
 * @property {string} member_password - mot de passe du membre
 * @property {string} member_username - login pour se connecter du membre
 */
/**
 * @typedef {objet} InputPost
 * @property {number} id - identifiant unique, Pk de la table
 * @property {string} member_lastname - prénom du membre
 * @property {string} member_firstname - nom de famille du membre
 * @property {string} member_email - email du membre
 * @property {string} member_password - mot de passe du membre
 * @property {string} member_username - login pour se connecter du membre
 */
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
        const result = await client.query('SELECT * FROM "member" WHERE id = $1', (postId));
        if (result.rowCount === 0) {
            return null;
        }
        return result.rows[0];
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
    async update(id, member) {
        const savedMember = await client.query(
            'SELECT * FROM update_member($1,$2)',
            [id, member],
        );
        return savedMember.rows[0];
    },
    /**
     * Supprime de la base de donnée un membre
     * @param {number} id - l'id du membre supprimé
     * @param {string} le membre supprimé
     * @returns le résultat de la suppression
     */
    async delete(id) {
        const result = await client.query('DELETE FROM post WHERE member = $1, $2', [id]);
        return !!result.rowCount;
    },
    /**
     * Verifie si le membre existe déjà
     * @param le nom du inputData
     * @param {*} postId
     * @returns
     */
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
