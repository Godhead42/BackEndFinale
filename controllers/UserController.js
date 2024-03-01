// UserController.js
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const generateJwt = (_id, email, role) => {
	return jwt.sign({ _id, email, role }, process.env.SECRET_KEY, {
		expiresIn: '24h',
	})
}

class UserController {
	async registration(req, res, next) {
		try {
			let { email, password, role='USER' } = req.body
			if (!email || !password) {
				return res
					.status(400)
					.json({ message: 'Email and password are required.' })
			}

			const candidate = await User.findOne({ email })

			if (candidate) {
				return res
					.status(400)
					.json({ message: 'User with this email already exists.' })
			}

			const hashPassword = await bcrypt.hash(password, 10)
			const user = await User.create({ email, role, password: hashPassword })
			const token = generateJwt(user._id, user.email, user.role)
			res.cookie('token', token, {
				httpOnly: true,
				maxAge: 24 * 60 * 60 * 1000, // 24 hours
			});
			res.locals.role = user.role
			res.redirect('/')
		} catch (error) {
			console.error(error)
			return res.status(500).json({ message: 'Internal Server Error' })
		}
	}

	async login(req, res, next) {
		try {
			const { email, password } = req.body
			const user = await User.findOne({ email })

			if (!user) {
				return res.status(500).json({ message: 'User not found.' })
			}
			req.user = user
			const comparePassword = await bcrypt.compare(password, user.password)

			if (!comparePassword) {
				return res.status(500).json({ message: 'Incorrect password.' })
			}

			const token = generateJwt(user._id, user.email, user.role)
			res.cookie('token', token, {
				httpOnly: true,
				maxAge: 24 * 60 * 60 * 1000, // 24 hours
			});
			res.locals.role = user.role
			res.redirect('/')
		} catch (error) {
			console.error(error)
			return res.status(500).json({ message: 'Internal Server Error' })
		}
	}
	async logout(req, res, next) {
		try {
			res.clearCookie('token');
			res.redirect('/login');
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: 'Internal Server Error' });
		}
	}

}

module.exports = new UserController()
