import { useState, useEffect } from 'react'

import { authAlertTimeout } from 'variables/global'

export const initialAlert = {
	severity: '',
	message: '',
}

const useAuthAlert = () => {
	const alertState = useState(initialAlert)

	const [alert, setAlert] = alertState

	useEffect(() => {
		if (alert.severity && alert.severity !== 'info') {
			setTimeout(() => {
				setAlert(initialAlert)
			}, authAlertTimeout)
		}
	}, [alert])

	return alertState
}

export default useAuthAlert
