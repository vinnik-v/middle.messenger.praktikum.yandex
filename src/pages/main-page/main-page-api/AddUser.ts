import ApiRequest from "../../../classes/ApiRequest";
import { BaseAPI } from "../../../classes/BaseApi";

const request = new ApiRequest('/api/v2/chats');

export default class AddUser extends BaseAPI {
    data: Record<string, number[] | number> | null = null;
    constructor(data: unknown) {
        super();
        this.data = data as Record<string, number[] | number>;
    }
    request(): Promise<XMLHttpRequest> {
        const userOptions = {
            data: this.data ? this.data : null,
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        }
        return request.put('/users', userOptions);
    }
}
