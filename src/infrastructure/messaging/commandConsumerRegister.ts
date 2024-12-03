import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'url'
import { AmqpClient, QueueBinding, Subscription } from 'amqp-simple-client'
import { container } from 'tsyringe'
import { CommandHandlerAdapter } from '../adapters/CommandHandler.adapter.js'
import { isObject } from '../../shared/utils/typeGuards.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

type ConsumerSettings = {
	name: string
	durable?: boolean
	bindings?: QueueBinding[]
}

export async function commandConsumerRegister() {
	const client = container.resolve(AmqpClient)

	const commandConsumerSettings = JSON.parse(
		(
			await fs.readFile(
				path.join(__dirname, '.', 'commandConsumer.settings.json'),
			)
		).toString(),
	)

	const consumerSubscriptions: Array<Subscription<unknown>> = []
	for (const config of Object.values(commandConsumerSettings)) {
		if (isObject<ConsumerSettings>(config, 'name')) {
			const consumer = client.createConsumer({
				name: config.name,
				bindings: config.bindings,
				options: {
					durable: config.durable,
				},
			})
			consumerSubscriptions.push(
				consumer.subscribe(({ headers, payload }) => {
					CommandHandlerAdapter.execute(headers.type, payload)
				}),
			)
		}
	}

	console.log('Consumers registered and subscribed')
}
