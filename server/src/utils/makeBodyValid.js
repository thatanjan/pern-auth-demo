import isEmpty from 'utils/isEmpty'

const makeValid = (properties, data) => {
	if (!Array.isArray(properties) || typeof data !== 'object') return false

	properties.forEach((property) => {
		const value = data[property]

		if (isEmpty(value)) {
			data[property] = ''
			return true
		}

		if (typeof value === 'string') data[property] = value.trim()

		return true
	})

	return data
}

export default makeValid
