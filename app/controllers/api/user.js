const bcrypt = require('bcrypt');
const jwtToken = require('../../middleware/jwt');
const User = require('../../models/user');

module.exports = {
    async getAll(_, res) {
        const users = await User.findAll();
        return res.json(users);
    },

    async register(req, res) {
        const {
            lastname,
            firstname,
            email,
            confirmEmail,
            password,
            confirmPassword,
        } = req.body;
        if (
            !lastname
      || !firstname
      || !email
      || !confirmEmail
      || !password
      || !confirmPassword
        ) {
            res.status(401).json({ msg: 'Tous les champs sont requis !' });
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

        const user = await User.findOneEmail(email);

        if (user) {
            res.status(401).json({ msg: 'Cet utilisateur existe déjà' });
            return;
        }

        delete req.body.confirmPassword;

        try {
            const hashPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                lastname,
                firstname,
                email,
                password: hashPassword,
                username: email,
            });
            const token = jwtToken.createToken({ user });
            console.log(newUser);
            res.json({ msg: 'Utilisateur créer', token });
        } catch (err) {
            res.json(err);
        }
    },

    async login(req, res) {
        const { email, password } = req.body;
        const user = await User.findOneEmail(email);
        if (!user) {
            res.status(401).json({ msg: 'utilisateur introuvable' });
            return;
        }

        const goodPassword = await bcrypt.compare(password, user.member_password);

        if (!goodPassword) {
            res.status(401).json({ msg: 'Email ou mot de passe incorrect' });
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
