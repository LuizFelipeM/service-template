import React from 'react'
import './index.css'
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import App from './App.js'

hydrateRoot(
	document.getElementById('root') as HTMLElement,
	<StrictMode>
		<App />
	</StrictMode>,
)
