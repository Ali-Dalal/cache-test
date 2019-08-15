var express = require('express');
var router = express.Router();

const sessionChecker = (req, res, next) => {
    console.log(req.session);
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/?status=already-logged-in');
    } else {
        next();
    }
};
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/login', sessionChecker, function (req, res, next) {
    res.render('login', { title: 'login' });
});

router.post('/login', function (req, res, next) {
    let username = req.body.name || 'Guest',
        password = req.body.password || 'Guest';
    req.session.user = { username, password };
    res.redirect('/');
});

router.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});

module.exports = router;
