import ApiRequest from "../../../classes/ApiRequest";
import { BaseAPI } from "../../../classes/BaseApi";

const request = new ApiRequest('/api/v2/auth');


export default class RegisterPageApi extends BaseAPI {
    
    constructor(data: Record<string, string>) {
        super(data);
    }

    request(): Promise<XMLHttpRequest> {
        const options = {
            data: this._data as Record<string, string>,
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        }

        return request.post('/signup', options);
    }
}
