import Form from "../../../../components/form";
import HandleChatUsers from "../../main-page-api/HandleChatUsers";

export default class ModalForm extends Form {
    constructor(props: typeof Form.prototype.props, formType?: string) {
        super(props, formType);

        this.apiRequest = async (data: Record<string, string>) => {
            const apiRequest = new HandleChatUsers(555);

            return apiRequest.request();
        }
    }
}