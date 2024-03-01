const User = require('../models/User');
const Tour = require('./TourController');
const {add} = require("nodemon/lib/rules");


const HistoryController = {
    addTourToHistory: async (userId, tourId) => {
        try {
            console.log(userId)
            const user = await User.findById(userId);
            console.log(user)
            if (!user) {
                throw new Error('User not found');
            }

            // Update the user's history with the new tour
            user.history.push({
                action: 'added',
                tour: tourId,
                timestamp: Date.now(),
            });

            // Save the user back to the database with the updated history
            await user.save();
        } catch (error) {
            console.error('Error in addTourToHistory:', error.message);
            throw error;
        }
    },
    deleteTourFromHistory: async (userId, tourId) => {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            // Find the history entry corresponding to the given tourId
            const historyEntry = user.history.find(entry => entry.tour.toString() === tourId);

            if (!historyEntry) {
                throw new Error('History entry not found for the given tour');
            }

            // Update the action to 'deleted' in the found history entry
            historyEntry.action = 'deleted';

            // Save the user back to the database with the updated history
            await user.save();
        } catch (error) {
            console.error('Error in deleteTourFromHistory:', error.message);
            throw error;
        }
    },
    getAddedTours: async (req, res) => {
        try {
            const userId = req.user.id;
            const user = await User.findById(userId).populate('history.tour');

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            console.log(user)
            const addedTours = user.history.filter(entry => entry.action === 'added');
            console.log(addedTours)
            return addedTours
        } catch (error) {
            console.error('Error in getAddedTours:', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getDeletedTours: async (req, res) => {
        try {
            const userId = req.user.id;
            const user = await User.findById(userId).populate('history.tour');

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const deletedTours = user.history.filter(entry => entry.action === 'deleted');
            return deletedTours
        } catch (error) {
            console.error('Error in getDeletedTours:', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = HistoryController;
