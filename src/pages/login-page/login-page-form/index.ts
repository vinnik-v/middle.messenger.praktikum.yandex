import Form from "../../../components/form";
import LoginPageApi from "../login-page-api/LoginPageApi";
import checkUserLogged from "../../../functions/checkUserLogged";
import store, { StoreEvents } from "../../../classes/Store";

export default class LoginPageForm extends Form {
    constructor(props: typeof Form.prototype.props, formType?: string) {
        super(props, formType);

        this.apiRequest = async (data: Record<string, string>) => {
            const apiRequest = new LoginPageApi(data);
            store.clearState();
            return apiRequest.request().then(async () => {
                const userResp = await checkUserLogged();
                try {
                    const currentUser = JSON.parse(userResp.response);
                    store.set('currentUser', currentUser, StoreEvents.UserLogged);
                } catch {
                    //
                }
              });
        }
    }
}
