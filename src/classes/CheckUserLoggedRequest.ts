import ApiRequest from "./ApiRequest";
import { BaseAPI } from "./BaseApi";

const request = new ApiRequest('/api/v2/auth');


export default class CheckUserRequest extends BaseAPI {
    
        request(): Promise<XMLHttpRequest> {
        const userOptions = {
            data: null,
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        }
        return request.get('/user', userOptions);
    }
}
