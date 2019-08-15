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
    let colors = []
    for (let i = 0; i < 10; i++)
        colors.push('#' + (Math.random() * 0xFFFFFF << 0).toString(16));
    res.render('index', { title: 'Express', colors: colors });
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
