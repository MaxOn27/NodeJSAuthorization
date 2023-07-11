const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const csrf = require('csurf')
require('dotenv').config();

const websiteRoutes = require('./routes/website');
const authRoutes = require('./routes/auth');
const path = require("path");

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
  })
);

const csrfProtection = csrf()

app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(csrfProtection)

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken()
  next();
});


app.use(websiteRoutes);
app.use(authRoutes);


app.listen(3001, () => console.log('Server runs on port ' + process.env.SERVER_PORT));