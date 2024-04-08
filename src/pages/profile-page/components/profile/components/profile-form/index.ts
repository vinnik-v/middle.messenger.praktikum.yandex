import Form from "../../../../../../components/form";
import Block from "../../../../../../classes/Block";
import prepareFields from "../../../../../../components/form/functions/prepareFields";
import { fieldSets, buttonsSets } from '../../../../../../components/form/elementsProps';
import prepareButtons from '../../../../../../components/form/functions/prepareButtons';
import LogoutRequest from "./profile-form-api/LogoutRequest";
import Router from "../../../../../../classes/Router";

export default class ProfileForm extends Form {
    constructor(props: typeof Block.prototype.props) {
        const fields = prepareFields(fieldSets.profileForm, true);
        fields.forEach(item => {
            const key = Object.keys(item)[0];
            const field = item[key] as Block;
            const input = (<Record<string, Block>>field.children).input._element as HTMLInputElement;
            input.disabled = true;
        })

        const buttonsProps = buttonsSets.profileForm;
        const buttons = prepareButtons(buttonsProps);

        const changeDataButton = Object.values(buttons[1])[0];
        changeDataButton.setProps({
            events: {
                click: (event: Event) => {
                    event.preventDefault();
                    const fields = this.children.fields as Record<string, Block>[];        
                    fields.forEach(item => {
                        const key = Object.keys(item)[0];
                        const field = item[key] as Block;
                        const input = (<Record<string, Block>>field.children).input._element as HTMLInputElement;
                        input.disabled = false;
                    });
                    this.children.buttons = buttons.filter(item => item['form-button_1']);
                    this.setProps({
                        buttonsChanged: true
                    })
                }
            }
        })
        
        const changePasswordButton = Object.values(buttons[2])[0];
        changePasswordButton.setProps({
            events: {
                click: (event: Event) => {
                    event.preventDefault();
                    const fields = prepareFields(fieldSets.changePassword, true) as Record<string, Block>[];        
                    this.children.fields = fields;
                    this.children.buttons = buttons.filter(item => item['form-button_1']);
                    this.setProps({
                        buttonsChanged: true
                    })
                }
            }
        })

        const logoutButton = Object.values(buttons[3])[0];
        logoutButton.setProps({
            events: {
                click: async (event: Event) => {
                    event.preventDefault();
                    const logoutRequest = new LogoutRequest();

                    try {
                        await logoutRequest.request();
                        const router = new Router();
                        router.go("/");

                    } catch (err) {
                        alert(err);
                    }
                }
            }
        })

        const children = {
            fields,
            buttons: buttons.slice(1)
        }
                
        super({...children, ...props });
    }
}
