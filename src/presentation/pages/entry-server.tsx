import React from 'react'
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.js'

export function render() {
	const html = renderToString(
		<StrictMode>
			<App />
		</StrictMode>,
	)
	return { html }
}
