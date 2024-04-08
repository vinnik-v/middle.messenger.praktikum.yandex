type Request = <T>(data?: T) => Error | Promise<XMLHttpRequest>;

export class BaseAPI {
    _data: Record<string, string> | undefined;
    constructor(data?: Record<string, string>) {
        this._data = data;
    }
    create(): Request { throw new Error('Not implemented'); }

    request(): Promise<XMLHttpRequest> { throw new Error('Not implemented'); }

    update(): Request { throw new Error('Not implemented'); }

    delete(): Request { throw new Error('Not implemented'); }
}
