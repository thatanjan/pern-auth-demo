import axios from 'axios'
import cookies from 'js-cookie'

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL

export const serverAxios = (token) => {
	if (!token) return false

	return axios.create({
		baseURL,
		headers: {
			authorization: token,
		},
	})
}

const instance = axios.create({
	baseURL,
	headers: {
		authorization: cookies.get('jwt'),
	},
})

export default instance
