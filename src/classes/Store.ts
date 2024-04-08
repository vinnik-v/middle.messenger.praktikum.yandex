import EventBus from "./EventBus";

export enum StoreEvents {
    Updated = 'updated',
}

class Store extends EventBus {
    state: Record<string, unknown> = {};

    public set(key: string, value: unknown) {
        this._setState(key, value);

        // метод EventBus
        this.emit(StoreEvents.Updated);
    }

    public getState() {
        return this.state;
    }

    _setState(key: string, value: unknown) {
        this.state[key] = value;
    }
}

export default new Store(); 
