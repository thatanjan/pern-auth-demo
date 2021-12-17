/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import NextLink from 'next/link'

const NextComposed = React.forwardRef((props, ref) => {
	const { as, href, ...other } = props

	return (
		<NextLink href={href} as={as}>
			<a ref={ref} {...other} />
		</NextLink>
	)
})

const Link = (props) => {
	const {
		MuiComponent,
		href,
		activeClassName = 'active',
		className: classNameProps,
		innerRef,
		naked,
		button,
		sx,
		...other
	} = props

	const router = useRouter()
	const pathname = typeof href === 'string' ? href : href.pathname
	const className = clsx(classNameProps, {
		[activeClassName]: router.pathname === pathname && activeClassName,
	})

	if (naked) {
		return (
			<NextComposed className={className} ref={innerRef} href={href} {...other} />
		)
	}

	const linkStyle = {
		textDecoration: 'none',
		color: 'secondary.dark',

		'&:hover': {
			textDecoration: 'underline',
		},
		...sx,
	}

	if (button)
		return (
			<MuiComponent
				component={NextComposed}
				className={className}
				ref={innerRef}
				href={href}
				{...other}
				sx={sx}
			/>
		)

	return (
		<MuiComponent
			component={NextComposed}
			className={className}
			ref={innerRef}
			href={href}
			sx={linkStyle}
			{...other}
		/>
	)
}

export default React.forwardRef((props, ref) => (
	<Link {...props} innerRef={ref} />
))
