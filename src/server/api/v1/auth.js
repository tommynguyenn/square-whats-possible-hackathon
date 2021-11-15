const router = require('express').Router();
const Firebase = require( '../../utils/firebase' );
const Square = require( '../../utils/square' );
const { STATUS_CODES } = require('../../utils/constants');

router.post('/register', async (req, res) => {
    console.log(`POST /api/v1/auth/register called`);
    const auth = await Firebase.registerUser(req.body.email, req.body.password);
    
    if ( auth.status === STATUS_CODES.FAIL ) {
        return res.json({
            status: STATUS_CODES.FAIL,
            data: auth.data
        });
    }

    const response = await Square.createCustomer( req.body.email );
    if ( response.status === STATUS_CODES.FAIL ) {
        return res.json({
            status: STATUS_CODES.FAIL,
            data: response.data
        });
    }

    req.session.user = auth.data.user;

    res.json({
        status: STATUS_CODES.OK,
        data: auth.data.user
    });
});

router.post('/login', async (req, res) => {
    console.log(`POST /api/v1/auth/login called`);
    const auth = await Firebase.validateUser(req.body.email, req.body.password);
    
    if ( auth.status === STATUS_CODES.FAIL ) {
        return res.json({
            status: STATUS_CODES.FAIL,
            data: auth.data
        });
    }
    req.session.user = auth.data.user;
    
    res.json({
        status: STATUS_CODES.OK,
        data: auth.data.user
    });
});

module.exports = router;
