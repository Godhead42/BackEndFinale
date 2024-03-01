const express = require('express');
const router = express.Router();
const HistoryController = require('../controllers/historyController');
const Tour = require('../controllers/TourController');

// Route to get added tours
router.get('/added', async (req, res) => {
    try {
        const addedTours = await HistoryController.getAddedTours(req, res);
        res.render('addedTours', { addedTours });
    } catch (error) {
        console.error('Error in /added route:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to get deleted tours
router.get('/deleted', async (req, res) => {
    try {
        const deletedTours = await HistoryController.getDeletedTours(req, res);
        res.render('deletedTours', { deletedTours });
    } catch (error) {
        console.error('Error in /deleted route:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to delete a tour from history
router.post('/delete/:tourId', async (req, res) => {
    try {
        const tourId = req.params.tourId;
        const userId = req.user.id;

        await HistoryController.deleteTourFromHistory(userId, tourId);

        res.redirect('/history/added'); // Redirect to the added tours page
    } catch (error) {
        console.error('Error in /delete route:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
