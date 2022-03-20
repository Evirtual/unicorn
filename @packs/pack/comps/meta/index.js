import React from 'react'
import Head from 'next/head'

const Meta = (props) => {

  const { title, desc, url, cover } = props

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="author" content="@unicorn" />
      <title>{desc ? `@${title} - ${desc}` : title ? `@${title}` : "@unicorn"}</title>
      <meta name="title" content={desc ? `@${title} - ${desc}` : title ? `@${title}` : "@unicorn"} />
      <meta name="description" content={desc ? desc : "It's a place to express your uniqueness in ways that inspire us to feel more confident in our everyday life"} />
      {/* facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url ? url : "https://atunicorn.io/"} />
      <meta property="og:title" content={title ? `@${title}` : "@unicorn"} />
      <meta property="og:description" content={desc ? desc : "It's a place to express your uniqueness in ways that inspire us to feel more confident in our everyday life"} />
      <meta property="og:image" content={cover ? `${cover}.png` : "https://atunicorn.io/static/unicorn-cover.png"} />
      <meta property="og:image:type" content="image/png" /> 
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {/* twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url ? url : "https://atunicorn.io/"} />
      <meta property="twitter:title" content={title ? `@${title}` : "@unicorn"} />
      <meta property="twitter:description" content={desc ? desc : "It's a place to express your uniqueness in ways that inspire us to feel more confident in our everyday life"} />
      <meta property="twitter:image" content={cover ? `${cover}.png` : "https://atunicorn.io/static/unicorn-cover.png"} />
      <link rel="shortcut icon" type="image/x-icon" href="/static/favicons/favicon.ico" />
      <link rel="icon" type="image/x-icon" href="/static/favicons/favicon.ico" />
      <link rel="icon" type="image/png" href="/static/favicons/favicon-196x196.png" sizes="196x196" />
      <link rel="icon" type="image/png" href="/static/favicons/favicon-32x32.png" sizes="32x32" />
      <link rel="icon" type="image/png" href="/static/favicons/favicon-16x16.png" sizes="16x16" />
      <link rel="apple-touch-icon-precomposed" sizes="152x152" href="/static/favicons/apple-touch-icon-152x152.png" />
      <meta name="application-name" content="&nbsp;"/>
      <meta name="msapplication-TileColor" content="#FFFFFF" />
      <meta name="msapplication-square150x150logo" content="/static/favicons/mstile-150x150.png" />
      <link rel="manifest" href="/manifest.json" />
    </Head>
  )
}

export default Meta