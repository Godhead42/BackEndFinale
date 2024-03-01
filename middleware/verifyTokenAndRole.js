// verifyTokenAndRole.js
const jwt = require('jsonwebtoken')
const  User  = require('../models/User')

const verifyTokenAndRole = requiredRole => async (req, res, next) => {
	const token = req.cookies.token;

	if (!token) {
		return res.status(401).json({ message: 'Unauthorized: Token is missing' })
	}

	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY)

		const user = await User.findById(decoded._id)

		if (!user) {
			return res.status(401).json({ message: 'Unauthorized: User not found' })
		}

		if (user.role !== requiredRole) {
			return res.status(403).json({ message: 'Forbidden: Insufficient role' })
		}

		req.user = user
		next()
	} catch (error) {
		console.error(error)
		return res.status(401).json({ message: 'Unauthorized: Invalid token' })
	}
}

module.exports = verifyTokenAndRole
