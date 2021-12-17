import { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-mui'

import MuiLink from 'components/MuiLink'
import Alert from 'components/Alert'

import Input from './Input'
import LoginValidator from 'validators/login'

import axios from 'utils/axios'

import useAuthAlert from 'hooks/useAuthAlert'
import useLogin from 'hooks/useLogin'

const Login = () => {
	const [alert, setAlert] = useAuthAlert()
	const [successful, setSuccessful] = useState(false)
	const login = useLogin()

	return (
		<Formik
			initialValues={{
				email: '',
				password: '',
			}}
			validate={(values) => LoginValidator(values)}
			onSubmit={async (values) => {
				setAlert({
					severity: 'info',
					message: 'Logging in...',
				})

				try {
					const {
						data: {
							data: { token },
							message,
						},
					} = await axios.post('/login', values)

					setAlert({
						severity: 'success',
						message: message,
					})
					setSuccessful(true)

					login(token)
				} catch (error) {
					setAlert({
						severity: 'error',
						message: error.response.data.errors.message,
					})
				}
			}}
		>
			{({ submitForm, isSubmitting }) => (
				<Form>
					<Input component={TextField} name='email' type='email' label='Email' />
					<Input
						component={TextField}
						type='password'
						label='Password'
						name='password'
					/>

					{isSubmitting && (
						<LinearProgress
							sx={{
								mt: '1rem',
							}}
						/>
					)}

					<Button
						variant='contained'
						color='primary'
						disabled={isSubmitting || successful}
						onClick={submitForm}
						fullWidth
						sx={{ margin: '1rem 0' }}
					>
						Submit
					</Button>

					<MuiLink
						MuiComponent={Typography}
						href='/authentication/register'
						align='right'
						sx={{ display: 'block' }}
					>
						Don't have an account?
					</MuiLink>

					<Alert {...alert} />
				</Form>
			)}
		</Formik>
	)
}

export default Login
