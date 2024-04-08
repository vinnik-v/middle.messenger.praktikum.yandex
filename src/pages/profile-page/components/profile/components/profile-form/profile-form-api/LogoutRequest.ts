import ApiRequest from "../../../../../../../classes/ApiRequest";
import { BaseAPI } from "../../../../../../../classes/BaseApi";

const request = new ApiRequest('/api/v2/auth');

export default class LogoutRequest extends BaseAPI {
    
    request(): Promise<XMLHttpRequest> {
        const userOptions = {
            data: null,
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        }
        return request.post('/logout', userOptions);
    }
}
