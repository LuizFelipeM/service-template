import { container } from 'tsyringe'
import { CreateUserCommandHandler } from './commandhandlers/CreateUser.commandhandler'
import { CommandHandler } from './commandhandlers/CommandHandler'

class CommandHandlerNotFoundError extends Error {}

export class CommandHandlerAdapter {
	static execute(commandType: string, payload: unknown): void {
		let commandHandler: CommandHandler

		switch (commandType) {
			case 'createUser':
				commandHandler = container.resolve(CreateUserCommandHandler)
		}

		if (!commandHandler)
			throw new CommandHandlerNotFoundError(
				`Command type ${commandType} not registed`,
			)

		commandHandler.handle(payload)
	}
}
