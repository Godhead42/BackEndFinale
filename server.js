require('dotenv').config();
const express = require('express');
const app = express();
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./db');
const routes = require('./routes/mainRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(cookieParser());

app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'","*"],
                scriptSrc: ["'self'", 'code.jquery.com', 'cdn.jsdelivr.net', 'stackpath.bootstrapcdn.com', 'https://mdbcdn.b-cdn.net', "'unsafe-inline'"],
                imgSrc: ["'self'", 'data:', 'https://mdbcdn.b-cdn.net', '*'],
                connectSrc: ["'self'", '*'],
                scriptSrcElem: ["'self'", 'code.jquery.com', 'cdn.jsdelivr.net', 'stackpath.bootstrapcdn.com', 'https://mdbcdn.b-cdn.net', "'unsafe-inline'", '*', "'unsafe-eval'"],
            },
        },
    })
);



app.use(async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        res.locals.role = null
    }else{
        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        const user = await User.findById(decoded._id)

        if (!user) {
            res.locals.role = null
        }
        res.locals.role = user.role
    }
    next()
});

app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on: http://localhost:${PORT}`);
});
