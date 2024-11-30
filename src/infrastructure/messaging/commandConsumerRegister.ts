import { AmqpClient, Subscription } from "amqp-simple-client";
import { container } from "tsyringe";
import commandConsumerSettings from "./commandConsumer.settings.json";
import { CommandHandlerAdapter } from "../adapters/CommandHandler.adapter";

export function commandConsumerRegister() {
  const client = container.resolve(AmqpClient)

  const consumerSubscriptions: Array<Subscription<unknown>> = []
  for (const config of Object.values(commandConsumerSettings)) {
    const consumer = client.createConsumer({
      name: config.name,
      bindings: config.bindings,
      options: {
        durable: config.durable
      }
    })

    consumerSubscriptions.push(
      consumer.subscribe(({ headers, payload }) => {
        CommandHandlerAdapter.execute(headers.type, payload)
      })
    )
  }

  console.log("Consumers registered and subscribed")
}