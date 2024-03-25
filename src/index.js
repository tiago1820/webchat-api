const express = require("express");

const app = express();

app.use(express.json());

app.get('/', (req, res)=> {
    return res.send({message: 'Welcome to WebChat API.'})
})

const authRoutes = require('./routes/auth.routes.js');
app.use('/', authRoutes);
const userRoutes = require('./routes/user.routes.js');
app.use('/users', userRoutes);


module.exports = app;