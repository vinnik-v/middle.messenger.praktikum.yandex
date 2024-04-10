import Block from "../../../../classes/Block";
import Form from "../../../../components/form";
import AddChat from "../../main-page-api/AddChat";
import ModalSearchField from "../modal-search-field";

export default class AddUserForm extends Form {
    constructor(props: typeof Form.prototype.props, formType?: string) {
        
        super(props, formType);

        this.apiRequest = async (data: Record<string, string>) => {
            const apiRequest = new AddChat(data);

            return apiRequest.request();
        }
        const buttons = this.children.buttons as Record<string, Block>[];
        
        const cancelButton = buttons.find(item => {
            const button = Object.values(item)[0];
            if (button.props.buttonType === 'button') return button;
        });
        if (cancelButton) {
            const button = Object.values(cancelButton)[0];
            button.setProps({
                events: {
                    click: (e)=> {
                        e.preventDefault();
                        const dropdown = document.getElementById('add-user-modal');
                        if (dropdown) {
                            if (dropdown.classList.contains('display-none')) dropdown.classList.remove('display-none');
                            else dropdown.classList.add('display-none');
                        }
                    }
                }
            })
        }

        const searchField = new ModalSearchField({
            settings: { withInternalID: true },
        })

        this.setProps({
            fields: [{searchField}]
        })
    }
}
