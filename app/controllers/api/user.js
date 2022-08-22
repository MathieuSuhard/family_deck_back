const bcrypt = require('bcrypt');
const userDatamapper = require('../../models/user');
const familyDatamapper = require('../../models/family');
const roleDatamapper = require('../../models/role');
// const { ApiError } = require('../../helpers/errorHandler');
const jwtToken = require('../../middleware/jwt');

module.exports = {
    async getAll(_, res) {
        const users = await userDatamapper.findAll();
        return res.json(users);
    },
    async register(req, res) {
        const {
            familyName,
            lastname,
            firstname,
            roleId,
            dateBirth,
            email,
            confirmEmail,
            password,
            confirmPassword,
        } = req.body;
        if (!familyName || !lastname || !firstname
            || !roleId || !dateBirth || !email || !confirmEmail || !password
            || !confirmPassword
        ) {
            res.status(401).json({ msg: 'Tous les champs sont requis !' });
            return;
        }
        const family = await familyDatamapper.findOneName(familyName);
        if (family) {
            res.status(401).json({ msg: 'Le nom de famille est déjà utilisé !' });
            return;
        }

        if (req.body.email !== req.body.confirmEmail) {
            res.status(401).json({ msg: 'Les deux emails ne sont pas indentiques !' });
            return;
        }

        if (req.body.password !== req.body.confirmPassword) {
            res.status(401).json({ msg: 'Les deux mots de passes ne sont pas indentiques !' });
            return;
        }

        const user = await userDatamapper.findOneEmail(email);

        if (user) {
            res.status(401).json({ msg: 'Cet utilisateur existe déjà !' });
            return;
        }
        delete req.body.confirmPassword;
        const newFamily = await familyDatamapper.create({ familyName });

        try {
            const hashPassword = await bcrypt.hash(password, 10);

            const newUser = await userDatamapper.create({
                lastname,
                firstname,
                email,
                password: hashPassword,
                username: email,
            });
            const token = jwtToken.createToken({ user });
            const familyId = newFamily.family_id;
            const memberId = newUser.member_id;
            /* await familyDatamapper.AddBirthOfMemberData({
                memberId,
                dateBirth,
            }); */
            await familyDatamapper.AddMemberOfFamily({
                familyId,
                memberId,
            });
            await roleDatamapper.AddRoleOfMember({
                memberId,
                roleId,
            });
            res.json({
                msg: 'Utilisateur et famille créer', token, familyId, memberId,
            });
        } catch (err) {
            res.json(err);
        }
    },

    async login(req, res) {
        const { userName, password } = req.body;
        if (!userName
      || !password
        ) {
            res.status(401).json({ msg: 'Tous les champs sont requis !' });
            return;
        }
        const user = await userDatamapper.findOneEmail(userName);
        if (!user) {
            res.status(401).json({ msg: 'utilisateur introuvable' });
            return;
        }

        const goodPassword = await bcrypt.compare(password, user.member_password);

        if (!goodPassword) {
            res.status(401).json({ msg: 'Username ou mot de passe incorrect' });
            return;
        }

        const token = jwtToken.createToken({ user });

        const member = {
            id: user.member_id,
            lastname: user.member_lastname,
            firstname: user.member_firstname,
        };
        res.json({ token, member });
    },

};
