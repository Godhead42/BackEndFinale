const Tour = require('../models/Tour')
const HistoryController = require("./historyController");
const calculatePrice = require('../utils/calculatePrice')
const getWeather = require("../utils/weather");


const TourController = {
	getAll: async (req, res) => {
		try {
			const tours = await Tour.find()
			return tours
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	},
	create: async (req, res) => {
		try {
			let {
				cityName = 'Astana',
				adults = 1,
				children = 0,
				phone = '344334',
				hotelRating = 3,
				dateArrival = Date.now(),
				dateDeparture = Date.now() + 7 * 24 * 60 * 60 * 1000,
			} = req.body;

			// Calculate price using the provided parameters
			const { temperature, condition } = await getWeather(cityName)
			const calculatedPrice = await calculatePrice(cityName, hotelRating, adults, children,temperature,condition);
			const tour = new Tour({
				cityName,
				adults,
				children,
				phone,
				hotelRating,
				dateArrival,
				dateDeparture,
				price: calculatedPrice,
				temp: temperature,
				condition: condition,
			});

			await tour.save();
			await HistoryController.addTourToHistory(req.user._id, tour._id)

		} catch (error) {
			console.error('Error in create:', error.message);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	},
	update: async (req, res) => {
		try {
			const updatedField = req.body;
			const tour = await Tour.findByIdAndUpdate(req.params.id, { $set: updatedField }, { new: true });

			res.status(200).json(tour);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	arisePrice: async (req, res) => {
		try {
			const { increaseAmount } = req.body;

			if (isNaN(increaseAmount)) {
				return res.status(400).json({ error: 'Invalid increaseAmount' });
			}
			const updatedTours = await Tour.updateMany({}, { $inc: { price: increaseAmount } }, { new: true });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	delete: async (req, res) => {
		try {
			await Tour.findByIdAndDelete(req.params.id);
			res.status(200).json('sds');
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
}

module.exports = TourController
