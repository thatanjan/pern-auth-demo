import express from 'express'
import pg from 'pg'
import cors from 'cors'
import { config } from 'dotenv'
import { hash, compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import jwt from 'express-jwt'

import isEmpty from 'utils/isEmpty'
import validateRegisterInput from 'validators/register'
import validateLoginInput from 'validators/login'

config()

const { Pool } = pg

const pool = new Pool({
	user: process.env.DB_USER,
	password: process.env.PASSWORD,
	host: process.env.HOST,
	port: process.env.PORT,
	database: process.env.DATABASE,
})

const app = express()

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cors())

const login = '/login'
const register = '/register'

const unprotectedRoutes = [login, register]

app.use(
	jwt({
		secret: process.env.JWT_SECRET,
		algorithms: ['HS256'],
	}).unless({ path: unprotectedRoutes })
)

app.use((err, req, res, next) => {
	const { name, message } = err

	if (name === 'UnauthorizedError')
		return res.status(401).json({
			valid: false,
			message: message,
		})
})

const PORT = 8000

class Success {
	constructor(data = {}) {
		this.success = true
		this.data = data
	}

	addMessage(message) {
		this.message = message
		return this
	}
}

class Failure {
	constructor(errors = {}) {
		this.success = false
		this.errors = errors
	}
}

app.get('/getAllUsers', async (req, res) => {
	const { headers, user } = req

	console.log(user)

	const client = await pool.connect()
	const result = await client.query('SELECT name, email FROM users')
	res.send(result.rows)
	client.release()
})

app.post(register, async (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body)

	if (!isValid) return res.status(400).json(new Failure(errors))

	const { name, email, password } = req.body

	const hashedPassword = await hash(password, 10)

	const isEmailRegistered = await pool.query(
		'SELECT * FROM users WHERE email = $1',
		[email]
	)

	if (isEmailRegistered.rowCount)
		return res.status(400).json(new Failure({ message: 'Email already exists' }))

	const result = await pool.query(
		'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING _id',
		[name, email, hashedPassword]
	)

	if (!result.rowCount)
		return res.status(400).json(new Failure({ message: 'User not created' }))

	const token = sign(
		{
			_id: result.rows[0]._id,
		},
		process.env.JWT_SECRET,
		{ expiresIn: '7d' }
	)

	return res.send(
		new Success({
			token: `bearer ${token}`,
		}).addMessage('User created successfully')
	)
})

app.post(login, async (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body)

	if (!isValid) return res.status(400).json(new Failure(errors))

	const { email, password } = req.body

	const result = await pool.query('SELECT * FROM users WHERE email = $1', [
		email,
	])

	if (!result.rowCount)
		return res.status(400).send(new Failure({ message: 'User not found' }))

	const passwordsMatched = await compare(password, result.rows[0].password)

	if (!passwordsMatched)
		return res.status(400).send(new Failure({ message: 'Password is incorrect' }))

	const token = sign(
		{
			_id: result.rows[0]._id,
		},
		process.env.JWT_SECRET,
		{ expiresIn: '7d' }
	)

	return res.send(
		new Success({
			token: `bearer ${token}`,
		}).addMessage('User logged in successfully')
	)
})

app.get('/validateToken', async (req, res) => {
	const {
		user: { _id },
	} = req

	const result = await pool.query('SELECT name FROM users WHERE _id = $1', [_id])

	if (!result.rowCount)
		return res.status(400).send(new Failure({ message: 'User not found' }))

	return res.json({ valid: true })
})

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
