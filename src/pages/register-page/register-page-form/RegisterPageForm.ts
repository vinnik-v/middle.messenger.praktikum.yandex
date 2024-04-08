import Form from "../../../components/form";
import RegisterPageApi from "../register-page-api/RegisterPageApi";

export default class RegisterPageForm extends Form {
    constructor(props: typeof Form.prototype.props, formType?: string) {
        super(props, formType);

        this.apiRequest = async (data: Record<string, string>)=> {
            const apiRequest = new RegisterPageApi(data);
            return apiRequest.request();
        }
    }
}
