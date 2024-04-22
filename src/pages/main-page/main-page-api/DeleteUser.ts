import ApiRequest from "../../../classes/ApiRequest";
import { BaseAPI } from "../../../classes/BaseApi";

const request = new ApiRequest('/api/v2/chats');

export default class DeleteUser extends BaseAPI {
    data: Record<string, number[] | number> | null = null;
    constructor(data: Record<string, number[] | number>) {
        super();
        this.data = data;
    }
    request(): Promise<XMLHttpRequest> {
        const userOptions = {
            data: this.data ? this.data : null,
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        }
        return request.delete('/users', userOptions);
    }
}
