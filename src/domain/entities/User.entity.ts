import { randomUUID } from 'crypto'
import { Email } from '../value-objects/Email.valueobject.js'

export class User {
	public id: string
	public name: string
	public email: Email

	constructor(name: string, email: Email)
	constructor(name: string, email: Email, id: string)
	constructor(name?: string, email?: Email, id?: string) {
		if (!(email instanceof Email))
			throw Error(
				`Received an email of type ${typeof email} but the expected type is Email`,
			)

		this.id = id ?? randomUUID()
		this.name = name
		this.email = email
	}

	updateEmail(newEmail: Email) {
		this.email = newEmail
	}
}
