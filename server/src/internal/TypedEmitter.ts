import { EventEmitter } from 'events'

type EventMap = Record<string, any>

type EventType<T extends EventMap> = string & keyof T
type EventHandler<T> = (params: T) => void

interface Emitter<T extends EventMap> {
  on<K extends EventType<T>>(event: K, handler: EventHandler<T[K]>): void
  off<K extends EventType<T>>(event: K, handler: EventHandler<T[K]>): void
  emit<K extends EventType<T>>(event: K, params: T[K]): void
}

export class TypedEmitter<T extends EventMap> implements Emitter<T> {
  private emitter = new EventEmitter()

  on<K extends EventType<T>>(event: K, handler: EventHandler<T[K]>) {
    this.emitter.on(event, handler)
    return this
  }

  off<K extends EventType<T>>(event: K, handler: EventHandler<T[K]>) {
    this.emitter.off(event, handler)
    return this
  }

  emit<K extends EventType<T>>(event: K, payload: T[K]) {
    this.emitter.emit(event, payload)
  }
}
