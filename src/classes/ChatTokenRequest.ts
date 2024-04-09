import ApiRequest from "./ApiRequest";
import { BaseAPI } from "./BaseApi";

const request = new ApiRequest('/api/v2');


export default class ChatTokenRequest extends BaseAPI {
    chatId: string = '';
    constructor(chatId: number) {
        super();
        this.chatId = String(chatId);
    }

    request(): Promise<XMLHttpRequest> {
        const options = {
            data: null,
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        }
        return request.post('/chats/token/'+this.chatId, options);
    }
}