import cookies from 'js-cookie'

import { authAlertTimeout } from 'variables/global'

const login = (token, push) => {
	cookies.set('jwt', token)
	setTimeout(() => push('/'), authAlertTimeout)
}

export default login
