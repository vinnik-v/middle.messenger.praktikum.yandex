import ApiRequest from "../../../classes/ApiRequest";
import { BaseAPI } from "../../../classes/BaseApi";

const request = new ApiRequest('/api/v2/auth');


export default class LoginPageApi extends BaseAPI {
    
    constructor(data: Record<string, string>) {
        super(data);
    }

    request(): Promise<XMLHttpRequest> {
        const signinOptions = {
            data: this._data as Record<string, string>,
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        }
        return request.post('/signin', signinOptions);
    }
}
