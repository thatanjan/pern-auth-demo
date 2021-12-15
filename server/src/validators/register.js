import Validator from 'validator'
import isEmpty from 'utils/isEmpty'

const validateRegisterInput = (data) => {
	const errors = {}

	const validatorProperties = ['name', 'email', 'password', 'confirmPassword']

	validatorProperties.forEach((property) => {
		data[property] = !isEmpty(data[property]) ? data[property] : ''
	})

	if (!Validator.isLength(data.name, { min: 3, max: 30 })) {
		errors.name = 'Name must be between 2 and 30'
	}

	if (Validator.isEmpty(data.name)) errors.name = 'Name field is required'

	if (Validator.isEmpty(data.email)) errors.email = 'Email field is required'

	if (!Validator.isEmail(data.email)) errors.email = 'Invalid email address'

	if (Validator.isEmpty(data.password)) errors.password = 'Password is required'

	if (!Validator.isLength(data.password, { min: 6, max: 30 }))
		errors.password = 'password must be 6 to 30 characters'

	if (Validator.isEmpty(data.confirmPassword))
		errors.confirmPassword = 'Confirm password field is required'

	if (!Validator.equals(data.password, data.confirmPassword))
		errors.confirmPassword = 'passwords must match'

	return {
		errors,
		isValid: isEmpty(errors),
	}
}

export default validateRegisterInput
