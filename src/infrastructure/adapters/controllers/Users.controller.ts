import { Request, Response, Router } from 'express'
import { CreateUserUseCase } from '../../../application/use-cases/CreateUser.usecase'
import { container } from 'tsyringe'

export class UsersController {
	private readonly router = Router().post('/', this.createUser)

	getRouter() {
		return this.router
	}

	private async createUser(req: Request, res: Response) {
		const createUserUseCase = container.resolve(CreateUserUseCase)
		const user = await createUserUseCase.execute(req.body.name, req.body.email)
		res.status(201).json(user)
	}
}
