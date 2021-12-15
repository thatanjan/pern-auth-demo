import Validator from 'validator'
import isEmpty from 'utils/isEmpty'

const validateRegisterInput = (data) => {
	const errors = {}

	const validatorProperties = ['email', 'password']

	Object.keys(data).forEach((property) => {
		data[property] = !isEmpty(data[property]) ? data[property] : ''
	})

	validatorProperties.forEach((property) => {
		data[property] = !isEmpty(data[property]) ? data[property] : ''
	})

	if (Validator.isEmpty(data.email)) errors.email = 'Email field is required'

	if (!Validator.isEmail(data.email)) errors.email = 'Invalid email address'

	if (Validator.isEmpty(data.password)) errors.password = 'Password is required'

	return {
		errors,
		isValid: isEmpty(errors),
	}
}

export default validateRegisterInput
