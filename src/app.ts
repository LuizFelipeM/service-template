import 'reflect-metadata'
import 'dotenv/config'
import express from 'express'
import { pageRender } from './presentation/pages/serverSideRendering'
import { containerRegister } from './containerRegister'
import { UsersController } from './infrastructure/adapters/controllers/Users.controller'
import { dataSource } from './dataSource'
import { commandConsumerRegister } from './infrastructure/messaging/commandConsumerRegister'

const port = process.env.PORT || 3000

async function start() {
	const app = express()

	await dataSource.initialize()
	console.log('Database connected')

	containerRegister(dataSource)
	commandConsumerRegister()

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
