const express = require('express');
const router = express.Router();

const  TourController = require('../controllers/TourController')

const verifyTokenAndRole = require('../middleware/verifyTokenAndRole')

router.get('/', (req, res) => {
    res.render('travelAgency')
});
router.post('/',verifyTokenAndRole('USER'), async (req, res) => {
    await TourController.create(req, res)
    res.render('travelAgency')
});




module.exports = router;
