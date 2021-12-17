import React, { useState } from 'react'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import { Formik, Form } from 'formik'
import { TextField } from 'formik-mui'

import MuiLink from 'components/MuiLink'
import Alert from 'components/Alert'

import Input from './Input'
import RegisterValidator from 'validators/register'

import axios from 'utils/axios'

import useAuthAlert from 'hooks/useAuthAlert'
import useLogin from 'hooks/useLogin'

const Login = () => {
	const [alert, setAlert] = useAuthAlert()
	const login = useLogin()
	const [successful, setSuccessful] = useState(false)

	return (
		<Formik
			initialValues={{
				email: '',
				password: '',
				name: '',
				confirmPassword: '',
			}}
			validate={(values) => RegisterValidator(values)}
			onSubmit={async (values) => {
				setAlert({
					severity: 'info',
					message: 'Registering...',
				})

				try {
					const {
						data: {
							data: { token },
							message,
						},
					} = await axios.post('/register', values)

					login(token)

					setAlert({
						severity: 'success',
						message: message,
					})

					setSuccessful(true)
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
					<Input component={TextField} name='name' type='text' label='Name' />
					<Input component={TextField} name='email' type='email' label='Email' />
					<Input
						component={TextField}
						type='password'
						label='Password'
						name='password'
					/>
					<Input
						component={TextField}
						type='password'
						label='Confirm Password'
						name='confirmPassword'
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
						href='/authentication/login'
						align='right'
						sx={{ display: 'block' }}
					>
						Already have an account?
					</MuiLink>

					<Alert {...alert} />
				</Form>
			)}
		</Formik>
	)
}

export default Login
