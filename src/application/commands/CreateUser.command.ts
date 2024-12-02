import { inject, injectable } from 'tsyringe'
import { Command } from './Command'
import { CreateUserUseCase } from '../use-cases/CreateUser.usecase'
import { Email } from '../../domain/value-objects/Email.valueobject'

type CreateUserPayload = {
	name: string
	email: Email
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
