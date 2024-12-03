import { inject, injectable } from 'tsyringe'
import { Command } from './Command.js'
import { CreateUserUseCase } from '../use-cases/CreateUser.usecase.js'

type CreateUserPayload = {
	name: string
	email: string
}

@injectable()
export class CreateUserCommand implements Command<CreateUserPayload> {
	constructor(
		@inject(CreateUserUseCase)
		private readonly createUserUseCase: CreateUserUseCase,
	) {}

	execute(payload: CreateUserPayload): void {
		this.createUserUseCase.execute(payload.name, payload.email)
	}
}
