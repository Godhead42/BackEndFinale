const express = require('express')
const router = express.Router()

const travel = require('./travelagency')
const static = require('./static')
const user = require('./userRouter')
const history = require('./historyRouter')
const admin = require('./adminRouter')
const verifyTokenAndRole = require("../middleware/verifyTokenAndRole");

router.use('/', static)
router.use('/travelAgency', travel)
router.use('/', user)
router.use('/history',verifyTokenAndRole('USER'), history)
router.use('/admin', verifyTokenAndRole('Admin'), admin)

module.exports = router;
