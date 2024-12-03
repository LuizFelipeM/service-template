import React from 'react'
import './App.css'
import reactLogo from '../assets/react.svg'
import { Counter } from '../components/Counter.js'

const App: React.FC = () => {
	return (
		<>
			<div>
				<a href='https://vite.dev' target='_blank' rel='noreferrer'>
					<img src='/vite.svg' className='logo' alt='Vite logo' />
				</a>
				<a href='https://reactjs.org' target='_blank' rel='noreferrer'>
					<img src={reactLogo} className='logo react' alt='React logo' />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className='card'>
				<Counter />
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className='read-the-docs'>
				Click on the Vite and React logos to learn more
			</p>
		</>
	)
}

export default App
