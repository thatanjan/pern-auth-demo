import Validator from 'validator'
import isEmpty from 'utils/isEmpty'

const validateRegisterInput = (data) => {
	const errors = {}

	Object.keys(data).forEach((property) => {
		data[property] = !isEmpty(data[property]) ? data[property] : ''
	})

	const emptyEmail = Validator.isEmpty(data.email)
	const emptyPassword = Validator.isEmpty(data.password)
	const emptyConfirmPassword = Validator.isEmpty(data.confirmPassword)
	const emptyName = Validator.isEmpty(data.name)

	if (emptyName) errors.name = 'Name field is required'

	if (emptyEmail) errors.email = 'Email field is required'

	if (!emptyEmail && !Validator.isEmail(data.email))
		errors.email = 'Invalid email address'

	if (!emptyName && !Validator.isLength(data.name, { min: 3, max: 30 }))
		errors.name = 'Name must be between 2 and 30'

	if (emptyPassword) errors.password = 'Password is required'

	if (!emptyPassword && !Validator.isLength(data.password, { min: 6, max: 30 }))
		errors.password = 'password must be 6 to 30 characters'

	if (emptyConfirmPassword)
		errors.confirmPassword = 'Confirm password is required'

	if (!Validator.equals(data.password, data.confirmPassword))
		errors.confirmPassword = 'passwords must match'

	return errors
}

export default validateRegisterInput
