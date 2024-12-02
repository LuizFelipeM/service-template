import { randomUUID } from 'crypto'
import { Email } from '../value-objects/Email.valueobject'

export class User {
	public id: string
	public name: string
	public email: Email

	constructor(name: string, email: Email)
	constructor(name: string, email: Email, id: string)
	constructor(name?: string, email?: Email, id?: string) {
		this.id = id ?? randomUUID()
		this.name = name
		this.email = email
	}

	updateEmail(newEmail: Email) {
		this.email = newEmail
	}
}
