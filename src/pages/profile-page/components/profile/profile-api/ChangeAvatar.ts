import ApiRequest from "../../../../../classes/ApiRequest";
import { BaseAPI } from "../../../../../classes/BaseApi";

const request = new ApiRequest('/api/v2/user');

export default class ChangeAvatar extends BaseAPI {

    constructor(data: FormData) {
        super(data);
    }
    request(): Promise<XMLHttpRequest> {
        const userOptions = {
            data: this._data ? this._data as FormData : null,
            headers: { 'Content-Type': 'multipart/form-data' },
            credentials: 'include'
        }
        return request.put('/profile/avatar', userOptions);
    }
}
