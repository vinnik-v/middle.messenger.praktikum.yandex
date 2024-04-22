import ApiRequest from "../../../classes/ApiRequest";
import { BaseAPI } from "../../../classes/BaseApi";

const request = new ApiRequest('/api/v2/chats');

export default class GetChats extends BaseAPI {
    
        request(): Promise<XMLHttpRequest> {
            const userOptions = {
                data: null,
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            }
        return request.get('', userOptions);
    }
}
