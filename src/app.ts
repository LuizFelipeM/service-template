import 'reflect-metadata'
import 'dotenv/config'
import express from 'express'
import { pageRender } from './presentation/pages/serverSideRendering.js'
import { containerRegister } from './containerRegister.js'
import { UsersController } from './infrastructure/adapters/controllers/Users.controller.js'
import { dataSource } from './dataSource.js'
import { commandConsumerRegister } from './infrastructure/messaging/commandConsumerRegister.js'

const port = process.env.PORT || 3000

async function start() {
	const app = express()

	await dataSource.initialize()
	console.log('Database connected')

	containerRegister(dataSource)
	await commandConsumerRegister()

	app.use(express.json())

	app.use('/api/users', new UsersController().getRouter())
	pageRender(app)

	app.listen(port, () => {
		console.log(`Listening on http://localhost:${port}`)
	})
}

start()
	.then(() => console.log('Server started sucessfully!'))
	.catch((err) => console.error('Server failed to start with error:', err))
