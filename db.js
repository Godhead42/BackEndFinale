const mongoose = require('mongoose')

const connectionString = 'mongodb+srv://tilesjan2005:SaWesektDmkqXgeP@travel.8qnpcjc.mongodb.net/?retryWrites=true&w=majority&appName=travel'

mongoose.connect(connectionString, {})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => {
	console.log('Connected to MongoDB')
})
