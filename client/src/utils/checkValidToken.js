import { serverAxios as axios } from 'utils/axios'

const check = async (token) => {
	try {
		if (!token) return false

		const {
			data: { valid },
		} = await axios(token).get('/validateToken')

		return valid
	} catch (e) {
		return false
	}
}

export default check
