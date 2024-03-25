const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (user) => {
    return jwt.sign({ user: user }, process.env.SECRET_KEY);
}

const registerUser = async (req, res) => {
    console.log("AQUI: ", req);
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).send({ error: "user is already exist with email " + req.body.email });
        }
        user = await User.create(req.body);

        const token = generateToken(user);
        res.status(201).send({ token, isAuth: true, message: 'Register Success' });
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const loginUser = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).send({ error: "user is already exist with email " + req.body.email });
        }

        const match = user.comparePassword(req.body.password);

        if (!match) {
            return res.status(400).send({ error: "incorrect username or password" });
        }

        const token = generateToken(token);

        res.status(201).send({ token, isAuth: true, message: 'Login Success' });
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = { registerUser, loginUser };