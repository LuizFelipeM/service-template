export interface CommandHandler {
  handle(payload: unknown): void
}