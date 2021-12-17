import Validator from 'validator'
import isEmpty from 'utils/isEmpty'

const validateRegisterInput = (data) => {
	const errors = {}

	Object.keys(data).forEach((property) => {
		data[property] = !isEmpty(data[property]) ? data[property] : ''
	})

	const emptyEmail = Validator.isEmpty(data.email)
	const emptyPassword = Validator.isEmpty(data.password)

	if (emptyEmail) errors.email = 'Email field is required'

	if (emptyPassword) errors.password = 'Password is required'

	if (!emptyEmail && !Validator.isEmail(data.email))
		errors.email = 'Invalid email address'

	return errors
}

export default validateRegisterInput
