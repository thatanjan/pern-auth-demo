import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import cookies from 'js-cookie'

import axios from 'utils/axios'
import checkValidToken from 'utils/checkValidToken'

import Title from 'components/Title'

const Index = () => {
	const [users, setUsers] = useState([])
	const [loggedOut, setLoggedOut] = useState(false)
	const { push } = useRouter()

	useEffect(() => {
		;(async () => {
			const { data } = await axios.get('/getAllUsers')
			const {
				data: { results },
			} = await axios.get('https://randomuser.me/api/?inc=picture&results=100')

			const newUsers = data.map((user, index) => ({
				...user,
				image: results[index].picture.large,
			}))

			setUsers(newUsers)
		})()
	}, [])

	const handleLogout = async () => {
		cookies.remove('jwt')
		setLoggedOut(true)
		push('/authentication/login')

		return true
	}

	return (
		<Grid container justifyContent='center'>
			<Title />

			<Grid item xs={9} sm={8} md={7} lg={5} xl={4} sx={{ margin: '2rem 0' }}>
				<Button
					disabled={loggedOut}
					fullWidth
					variant='contained'
					onClick={handleLogout}
				>
					Logout
				</Button>
			</Grid>

			<Grid item xs={10} container spacing={5} justifyContent='center'>
				{users.map(({ name, email, image }) => (
					<Grid
						component={Card}
						item
						xs={11}
						md={6}
						lg={4}
						xl={3}
						key={email}
						sx={{ display: 'flex' }}
					>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-around',
								flexGrow: 1,
							}}
						>
							<CardContent sx={{ flex: '1 0 auto' }}>
								<Typography
									component='div'
									variant='h5'
									sx={{ textTransform: 'capitalize' }}
								>
									{name}
								</Typography>
								<Typography variant='subtitle1' color='text.secondary' component='div'>
									{email}
								</Typography>
							</CardContent>
						</Box>
						<CardMedia component='img' image={image} sx={{ maxWidth: '10rem' }} />
					</Grid>
				))}
			</Grid>
		</Grid>
	)
}

export const getServerSideProps = async ({ req }) => {
	const {
		cookies: { jwt },
	} = req

	const redirectObject = {
		redirect: {
			destination: '/authentication/login',
			permanent: false,
		},
	}

	const validToken = await checkValidToken(jwt)

	if (!validToken) return redirectObject

	return {
		props: {
			authUser: validToken,
		},
	}
}

export default Index
