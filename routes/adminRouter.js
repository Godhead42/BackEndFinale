const express = require('express');
const router = express.Router();
const TourController = require('../controllers/TourController');

router.get('/', async (req, res) => {
    try {
        const tours = await TourController.getAll();
        res.render('admin', { tours });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        await TourController.create(req, res);
        res.redirect('/admin');
    } catch (error) {
        console.error('Error in POST /:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        await TourController.update(req, res);
    } catch (error) {
        console.error('Error in PUT /:id', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.patch('/', async (req, res) => {
    try {
        await TourController.arisePrice(req, res);
        res.status(204).send();
    } catch (error) {
        console.error('Error in PATCH /', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        await TourController.delete(req, res);
    } catch (error) {
        console.error('Error in DELETE /:id', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports = router;
