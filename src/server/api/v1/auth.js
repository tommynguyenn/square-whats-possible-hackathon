const router = require('express').Router();
const Firebase = require( '../../utils/firebase' );
const { STATUS_CODES } = require('../../utils/constants');

router.post('/login', async (req, res) => {
    console.log(`POST /api/v1/auth/login called`);
    const auth = await Firebase.validateUser(req.body.email, req.body.password);
    
    if ( auth.status === STATUS_CODES.FAIL ) {
        return res.json({
            status: STATUS_CODES.FAIL,
            data: auth.data
        });
    }

    req.session.userEmail = req.body.email;

    res.json({
        status: STATUS_CODES.OK,
        data: auth.data.user
    });
});

module.exports = router;
