import { isEmpty, isEmail, isLength, equals } from 'validator'
import isEmptyValue from 'utils/isEmpty'

import makeBodyValid from 'utils/makeBodyValid'

const validateRegisterInput = (data) => {
	const errors = {}

	const properties = ['name', 'email', 'password', 'confirmPassword']

	data = makeBodyValid(properties, data)

	const { name, email, password, confirmPassword } = data

	const emptyEmail = isEmpty(email)
	const emptyPassword = isEmpty(password)
	const emptyConfirmPassword = isEmpty(confirmPassword)
	const emptyName = isEmpty(name)

	if (emptyName) errors.name = 'Name field is required'

	if (emptyEmail) errors.email = 'Email field is required'

	if (emptyPassword) errors.password = 'Password is required'

	if (emptyConfirmPassword)
		errors.confirmPassword = 'Confirm password is required'

	if (!emptyEmail && !isEmail(email)) errors.email = 'Invalid email address'

	if (!emptyName && !isLength(name, { min: 3, max: 30 }))
		errors.name = 'Name must be between 2 and 30'

	if (!emptyPassword && !isLength(password, { min: 6, max: 30 }))
		errors.password = 'password must be 6 to 30 characters'

	if (!equals(password, confirmPassword))
		errors.confirmPassword = 'passwords must match'

	return {
		errors,
		isValid: isEmptyValue(errors),
	}
}

export default validateRegisterInput
