import React from 'react'
import Grid from '@mui/material/Grid'

import Login from 'components/LoginForm'
import Register from 'components/RegisterForm'
import Title from 'components/Title'

import checkValidToken from 'utils/checkValidToken'

const LOGIN = 'login'
const REGISTER = 'register'

const Auth = ({ auth }) => {
	return (
		<>
			<Grid container justifyContent='center'>
				<Title />

				<Grid item xs={10} sm={7} md={5} lg={4} xl={3}>
					{auth === LOGIN && <Login />}
					{auth === REGISTER && <Register />}
				</Grid>
			</Grid>
		</>
	)
}

export const getServerSideProps = async ({ req, query: { auth } }) => {
	const {
		cookies: { jwt },
	} = req

	const redirectObject = {
		redirect: {
			destination: '/',
			permanent: false,
		},
	}

	const validToken = await checkValidToken(jwt)

	if (validToken) return redirectObject

	return {
		props: {
			auth,
		},
	}
}

export default Auth
