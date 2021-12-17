import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

const Title = () => {
	return (
		<Grid item sx={{ padding: '10rem 0 5rem', textAlign: 'center' }} xs={10}>
			<Typography variant='h2' sx={{ textTransform: 'uppercase' }}>
				Cules Auth
			</Typography>
		</Grid>
	)
}

export default Title
