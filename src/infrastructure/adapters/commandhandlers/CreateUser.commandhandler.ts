import { inject, injectable } from "tsyringe";
import { CreateUserCommand } from "../../../application/commands/CreateUser.command";
import { Email } from "../../../domain/value-objects/Email.valueobject";
import { CommandHandler } from "./CommandHandler";
import { isObject } from "../../../shared/utils/typeGuards";

type Payload = { name: string, email: string }

@injectable()
export class CreateUserCommandHandler implements CommandHandler {
  constructor(
    @inject(CreateUserCommand) private readonly createUserCommand: CreateUserCommand
  ) {
  }

  handle(payload: unknown): void {
    if (!isObject<Payload>(payload, "name", "email"))
      throw new TypeError("Payload is not of the expected type for a CreateUserCommand")

    this.createUserCommand.execute({
      name: payload.name,
      email: Email.create(payload.email)
    })
  }
}
