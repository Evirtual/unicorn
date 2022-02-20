import React from 'react'
import Router from 'next/router'
import Actstore from 'actstore'
import Head from 'next/head'
import Settings from 'pack/store'
import Layout from 'pack/comps/layout'

import '@fortawesome/fontawesome-svg-core/styles.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fal } from '@fortawesome/pro-light-svg-icons'
import { far } from '@fortawesome/pro-regular-svg-icons'
import { fad } from '@fortawesome/pro-duotone-svg-icons'
import { fas } from '@fortawesome/pro-solid-svg-icons'

library.add(fal, far, fad, fas)

/** Install pro
  npm config set "@fortawesome:registry" https://npm.fontawesome.com/
  npm config set "//npm.fontawesome.com/:_authToken" 2C14ED20-7F10-4AB4-9C27-184BDD7CBFD8
*/

const App = ({ Component, pageProps }) => {
	const { store, act } = Actstore(Settings, ['ready'])

	React.useEffect(() => {
		((window?.location?.pathname || '/') !== (Router?.router?.route || '/')) && Router.push(Router.router.asPath) 
		act('APP_INIT')
	}, [])

  return <React.Fragment>
		<Head>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<title>{process.env.name}</title>
			<link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico" />
			<link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
			<link rel="icon" type="image/png" href="/static/favicon-32x32.png" sizes="32x32" />
			<link rel="icon" type="image/png" href="/static/favicon-16x16.png" sizes="16x16" />
			{/* <link font-src="https://fonts.googleapis.com/css?family=Nunito:200,300,400,600,700" href="https://fonts.googleapis.com/css?family=Nunito:200,300,400,600,700" rel="stylesheet" /> */}
		</Head>
		<Layout />
		<Component {...pageProps} />
	</React.Fragment>
}

App.getInitialProps = async ({ Component, router, ctx }) => {
  const pageProps = Component.getInitialProps && await Component.getInitialProps(ctx) || {}
  const { asPath } = ctx

  const { route, query } = router
  return { pageProps, route, query, asPath }
}

export default App
