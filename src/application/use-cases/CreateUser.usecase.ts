import { inject, injectable } from 'tsyringe'
import { User } from '../../domain/entities/User.entity.js'
import { Email } from '../../domain/value-objects/Email.valueobject.js'
import { UserRepository } from '../../infrastructure/adapters/repositories/User.repository.js'

@injectable()
export class CreateUserUseCase {
	constructor(@inject(UserRepository) private userRepository: UserRepository) {}

	async execute(name: string, email: string) {
		const user = new User(name, Email.create(email))
		await this.userRepository.save(user)
		return user
	}
}
