export default class EventBus {
  listeners: Record<string, (<T>(args: T) => unknown)[]>;

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: (<T>(args: T) => unknown)) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: (<T>(args: T) => unknown)) {

    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      listener => listener !== callback
    );

  }

  emit<T>(event: string, ...args: T[]) {

    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach(function (listener) {
      listener(args);
    });

  }

}
