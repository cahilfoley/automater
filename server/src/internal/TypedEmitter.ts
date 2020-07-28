import { EventEmitter } from 'events'

type EventMap = Record<string, any>

type EventType<T extends EventMap> = string & keyof T
type EventHandler<T> = (payload: T) => void

interface Emitter<T extends EventMap> {
  on<K extends EventType<T>>(event: K, handler: EventHandler<T[K]>): this
  off<K extends EventType<T>>(event: K, handler: EventHandler<T[K]>): this
  once<K extends EventType<T>>(event: K, payload: T[K]): this
  emit<K extends EventType<T>>(event: K, payload: T[K]): boolean
  removeAllListeners(event?: EventType<T>): this
}

/**
 * The [[TypedEmitter]] abstract class provides a strongly typed wrapper around the node.js
 * [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) class.
 *
 * ```ts
 * type UpdateEvent = { from: string, to: string }
 *
 * interface ObservableStringEvents {
 *   updated: UpdateEvent
 * }
 *
 * class ObservableString extends TypedEmitter<ObservableStringEvents> {
 *   #value: string
 *
 *   get value() {
 *     return this.#value
 *   }
 *
 *   set value(newValue: string) {
 *     const previousValue = this.#value
 *     this.#value = newValue
 *     this.emit('updated', { from: previousValue, to: newValue })
 *   }
 * }
 *
 * const test = new ObservableString()
 *
 * test.on('updated', (payload) => console.log(`The value has change from "${payload.from}" to "${payload.to}"`))
 *
 * test.value = 'foo'
 * test.value = 'bar'
 * ```
 */
export class TypedEmitter<T extends EventMap> implements Emitter<T> {
  #emitter: EventEmitter

  /**
   * The constructor optionally allows for an existing event emitter to be passed in - if not provided then
   * a new emitter will be created.
   *
   * @param emitter Optional - if provided will override the emitter used internally
   */
  constructor(emitter = new EventEmitter()) {
    this.#emitter = emitter
  }

  /**
   * Attach an event listener for an event.
   *
   * @param event The event to listen for
   * @param handler The function to handle the event
   */
  on<K extends EventType<T>>(event: K, handler: EventHandler<T[K]>) {
    this.#emitter.on(event, handler)
    return this
  }

  /**
   * Remove a listener from an event.
   *
   * @param event The event to stop listening to
   * @param handler The function that was registered as the handler
   */
  off<K extends EventType<T>>(event: K, handler: EventHandler<T[K]>) {
    this.#emitter.off(event, handler)
    return this
  }

  /**
   * Attach an event listener for an event, similar to [[TypedEmitter.on]] except the
   * listener will automatically remove itself after being invoked once.
   *
   * @param event The event to listen for
   * @param handler The function to handle the event
   */
  once<K extends EventType<T>>(event: K, handler: EventHandler<T[K]>) {
    this.#emitter.once(event, handler)
    return this
  }

  /**
   * Emit an event, the payload will be emitted to all registered listeners.
   *
   * @param event The event to emit
   * @param payload The payload to be emitted
   */
  emit<K extends EventType<T>>(event: K, payload: T[K]) {
    return this.#emitter.emit(event, payload)
  }

  /**
   * A convenience method to remove all listeners from the TypedEmitter. If an
   * event parameter is provided then only the listeners for that event will
   * be removed.
   *
   * @param event Optionally an event to remove the listeners for, if not provided then all event listeners will be removed
   */
  removeAllListeners<K extends EventType<T>>(event?: K) {
    this.#emitter.removeAllListeners(event)
    return this
  }
}
