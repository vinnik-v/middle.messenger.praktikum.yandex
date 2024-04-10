import ApiRequest from "../../../classes/ApiRequest";
import { BaseAPI } from "../../../classes/BaseApi";

const request = new ApiRequest('/api/v2/chats');

export default class AddUser extends BaseAPI {

    constructor(data: Record<string, string>) {
        super(data);
    }
    request(): Promise<XMLHttpRequest> {
        const userOptions = {
            data: this._data ? this._data : null,
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        }
        return request.post('', userOptions);
    }
}