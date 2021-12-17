import React from 'react'
import Box from '@mui/material/Box'

const Layout = ({ children }) => {
	return (
		<>
			<Box
				container
				sx={{
					minHeight: '100vh',
					maxWidth: '100vw',
					overflowX: 'hidden',
				}}
			>
				{children}
			</Box>
		</>
	)
}

export default Layout
