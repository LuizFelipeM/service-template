export class Email {
	private constructor(private readonly value: string) {}

	static create(value: string): Email {
		if (!this.isValid(value)) {
			throw new Error('Invalid email address')
		}
		return new Email(value)
	}

	private static isValid(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return emailRegex.test(email)
	}

	getValue(): string {
		return this.value
	}

	equals(other: Email): boolean {
		return this.value === other.value
	}
}
