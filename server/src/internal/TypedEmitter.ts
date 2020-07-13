import { EventEmitter } from 'events'

type EventMap = Record<string, any>

type EventType<T extends EventMap> = string & keyof T
type EventHandler<T> = (payload: T) => void

interface Emitter<T extends EventMap> {
  on<K extends EventType<T>>(event: K, handler: EventHandler<T[K]>): this
  off<K extends EventType<T>>(event: K, handler: EventHandler<T[K]>): this
  once<K extends EventType<T>>(event: K, payload: T[K]): this
  emit<K extends EventType<T>>(event: K, payload: T[K]): boolean
  removeAllListeners(): this
}

export class TypedEmitter<T extends EventMap> implements Emitter<T> {
  #emitter = new EventEmitter()

  on<K extends EventType<T>>(event: K, handler: EventHandler<T[K]>) {
    this.#emitter.on(event, handler)
    return this
  }

  off<K extends EventType<T>>(event: K, handler: EventHandler<T[K]>) {
    this.#emitter.off(event, handler)
    return this
  }

  once<K extends EventType<T>>(event: K, handler: EventHandler<T[K]>) {
    this.#emitter.once(event, handler)
    return this
  }

  emit<K extends EventType<T>>(event: K, payload: T[K]) {
    return this.#emitter.emit(event, payload)
  }

  removeAllListeners() {
    this.#emitter.removeAllListeners()
    return this
  }
}
