const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		default: 'USER',
	},
	history: [
		{
			action: {
				type: String,
				enum: ['added', 'deleted'],
				required: true,
			},
			tour: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Tour',
			},
			timestamp: {
				type: Date,
				default: Date.now,
			},
		},
	],
})
const User = mongoose.model('User', userSchema);

module.exports = User;
