import { useRouter } from 'next/router'
import cookies from 'js-cookie'

import { authAlertTimeout } from 'variables/global'

const useLogin = () => {
	const { push } = useRouter()

	const login = (token) => {
		cookies.set('jwt', token)
		setTimeout(() => push('/'), authAlertTimeout)
	}

	return login
}

export default useLogin
