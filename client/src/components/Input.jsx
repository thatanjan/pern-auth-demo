import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-mui'

const Input = ({ type, label, name, ...props }) => (
	<Field
		component={TextField}
		label={label}
		name={name}
		type={type}
		variant='standard'
		fullWidth
		margin='dense'
		{...props}
	/>
)

export default Input
