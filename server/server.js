// eslint-disable-next-line no-undef
const express = require('express');
const app = express();
const port = 4000;
// eslint-disable-next-line no-undef
const path = require('path');
// eslint-disable-next-line no-undef
const users = require('./user');
const cors = require('cors');


// Configure passport local strategy
// eslint-disable-next-line no-undef
const passport = require('passport');
// eslint-disable-next-line no-undef
const Strategy = require('passport-local').Strategy;
// eslint-disable-next-line no-undef
const bodyParser = require('body-parser');


passport.use(new Strategy(
    (username, password, cb) =>
    {
        users.findByUsername(username, (err, user) =>
        {
            if (err) return cb(err); 
            if (!user) return cb(null, false);
            if (user.password != password) return cb(null, false); 
            return cb(null, user);
        });
    })
);


passport.serializeUser((user, cb) => cb(null, user.id));

passport.deserializeUser((id, cb)  =>
{
    users.findById(id,  (err, user) =>
    {
        if (err) return cb(err); 
        cb(null, user);
    });
});

// serve static files built by React
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, '../build')));

// eslint-disable-next-line no-undef
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());


//api
app.post('/api/login', 
    passport.authenticate('local'),
    (req, res) => res.json({success:true})
);

app.get('/',(req,res) => res.sendFile(path.join(__dirname, '../build', 'index.html')));


app.listen(port, () => console.log(`Server listen at http://loclahost:${port}`));