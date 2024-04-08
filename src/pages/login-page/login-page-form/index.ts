import Form from "../../../components/form";
import LoginPageApi from "../login-page-api/LoginPageApi";

export default class LoginPageForm extends Form {
    constructor(props: typeof Form.prototype.props, formType?: string) {
        super(props, formType);

        this.apiRequest = async (data: Record<string, string>) => {
            const apiRequest = new LoginPageApi(data);

            return apiRequest.request();
        }
    }
}
