import Form from "../../../components/form";
import RegisterPageApi from "../register-page-api/RegisterPageApi";
import checkUserLogged from "../../../functions/checkUserLogged";
import store, { StoreEvents } from "../../../classes/Store";

export default class RegisterPageForm extends Form {
    constructor(props: typeof Form.prototype.props, formType?: string) {
        super(props, formType);

        this.apiRequest = async (data: Record<string, string>)=> {
            const apiRequest = new RegisterPageApi(data);
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
