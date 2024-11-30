export interface Command<TPayload> {
  execute(payload: TPayload): void
}