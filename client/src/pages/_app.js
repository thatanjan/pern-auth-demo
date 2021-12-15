import * as React from 'react'
import Head from 'next/head'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import createEmotionCache from 'utils/createEmotionCache'

const clientSideEmotionCache = createEmotionCache()

export default function MyApp(props) {
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<title>My page</title>
				<meta name='viewport' content='initial-scale=1, width=device-width' />
			</Head>
			<CssBaseline />
			<Component {...pageProps} />
		</CacheProvider>
	)
}
