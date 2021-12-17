import React from 'react'
import Alert from '@mui/material/Alert'

const CustomAlert = ({ message, severity }) => {
	return (
		<>
			{message && (
				<Alert severity={severity} sx={{ mt: '1rem' }}>
					{message}
				</Alert>
			)}
		</>
	)
}

export default CustomAlert
