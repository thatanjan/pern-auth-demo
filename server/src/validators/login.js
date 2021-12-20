import { isEmpty, isEmail, isLength, equals } from 'validator'
import isEmptyValue from 'utils/isEmpty'

import makeBodyValid from 'utils/makeBodyValid'

const validateRegisterInput = (data) => {
	const errors = {}

	const properties = [ 'email', 'password']

	data = makeBodyValid(properties, data)

	const { name, email, password, confirmPassword } = data

	const emptyEmail = isEmpty(email)
	const emptyPassword = isEmpty(password)

	if (emptyEmail) errors.email = 'Email field is required'

	if (emptyPassword) errors.password = 'Password is required'

	if (!emptyEmail && !isEmail(email)) errors.email = 'Invalid email address'

	if (!emptyPassword && !isLength(password, { min: 6, max: 30 }))
		errors.password = 'password must be between 6 to 30 characters'

	return {
		errors,
		isValid: isEmptyValue(errors),
	}
}

export default validateRegisterInput
