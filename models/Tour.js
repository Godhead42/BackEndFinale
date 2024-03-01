	const mongoose = require('mongoose')

	const tourSchema = new mongoose.Schema(
		{
			cityName: {
				type: String,
				required: true,
			},
			adults: {
				type: Number,
				required: true,
			},
			children: {
				type: Number,
				required: true,
			},
			phone: {
				type: String,
				required: true,
			},
			hotelRating: {
				type: String,
				required: true,
			},
			dateArrival: {
				type: Date,
				required: true,
			},
			dateDeparture: {
				type: Date,
				required: true,
			},
			price: {
				type: Number,
				required: true,
			},
			temp: {
				type: Number,
				required: true,
			},
			condition: {
				type: String,
				required: true,
			},
			status: {
				type: String,
				default: 'pending',
				enum: ['pending', 'accepted'],
			}
		},
		{ timestamps: true }
	)

	const Tour = mongoose.model('Tour', tourSchema)

	module.exports = Tour
