type Request = Promise<XMLHttpRequest>;

export class BaseAPI {
    _data: unknown;
    constructor(data?: unknown) {
        this._data = data;
    }
    request(): Request { throw new Error('Not implemented'); }
}
