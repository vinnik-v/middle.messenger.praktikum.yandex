import Form from "../../../../../../components/form";
import Block from "../../../../../../classes/Block";
import prepareFields from "../../../../../../components/form/functions/prepareFields";
import { fieldSets, fields as Fields } from '../../../../../../components/form/elementsProps';
import LogoutRequest from "./profile-form-api/LogoutRequest";
import Router from "../../../../../../classes/Router";
import Button from "../../../../../../components/button";
import fieldValidation from "../../../../../../functions/fieldValidation";
import ChangePassword from "./profile-form-api/ChangePassword";
import store, { StoreEvents } from "../../../../../../classes/Store";
import FormInputField from "../../../../../../components/form/components/form-input-field";
import InputElem from "../../../../../../components/form/components/form-input-field/components/input";
import ChangeData from "./profile-form-api/ChangeData";
import checkUserLogged from "../../../../../../functions/checkUserLogged";

export default class ProfileForm extends Form {
    constructor(props: typeof Block.prototype.props) {

        store.on('UserLogged', () => {
            initData();
        })

        const createDefFields = (inpUserData: Record<string, string>) => {
            const fields: Record<string, unknown>[] = [];

            if (inpUserData) {
                const userData = {...inpUserData};
                delete userData.avatar;
                delete userData.id;

                const dataEntries = Object.entries(userData);
                dataEntries.forEach(([key, value]) => {
                    const fieldName = key;
                    const inputType = ['email', 'phone'].includes(key) ? key : 'text';
                    const inputElemProps = [
                        { name: 'id', value: fieldName },
                        { name: 'name', value: fieldName },
                        { name: 'type', value: inputType },
                    ]
                    if (value) {
                        inputElemProps.push({ name: 'value', value: value });
                    }
                    const fieldLabels = Fields as Record<string, Record<string, string>>
                    const fieldLabel = fieldLabels[fieldName].fieldLabel;

                    const field = new FormInputField({
                        fieldName: fieldName,
                        fieldLabel,
                        settings: { withInternalID: true },
                        input: new InputElem({
                            settings: { withInternalID: true },
                            className: 'form-input-field__input',
                            elemProps: inputElemProps,
                        }),
                    });

                    fields.push({ [fieldName]: field })
                });
            }

            fields.forEach(item => {
                const key = Object.keys(item)[0];
                const field = item[key] as Record<string, unknown>;
                const input = (<Record<string, Record<string, unknown>>>field.children).input._element as HTMLInputElement;
                input.disabled = true;
            })
            return fields;
        }

        const cancelButton = new Button('', {
            settings: { withInternalID: true },
            buttonText: 'Отмена',
            classList: ['form-button', 'cancel-button'],
            events: {
                click: (e: Event) => {
                    e.preventDefault();
                    createDefChildren();
                }
            }
        })

        const createDefButtons = () => {
            const buttons: Record<string, unknown>[] = []//prepareButtons(buttonsProps);

            const changeDataButton = new Button('', {
                settings: { withInternalID: true },
                buttonText: 'Изменить данные',
                classList: ['form-button'],
                events: {
                    click: (event: Event) => {
                        event.preventDefault();
                        const fields = this.children.fields as Record<string, unknown>[];
                        fields.forEach(item => {
                            const key = Object.keys(item)[0];
                            const field = item[key] as Record<string, unknown>;
                            const input = (<Record<string, Record<string, unknown>>>field.children).input._element as HTMLInputElement;
                            input.disabled = false;
                        });
                        const saveDataButton = new Button('', {
                            settings: { withInternalID: true },
                            buttonText: 'Сохранить данные',
                            classList: ['form-button', 'form-button_main'],
                            events: {
                                click: async (e: Event) => {
                                    e.preventDefault();
                                    const formIsValid = this.validate();
                                    if (formIsValid) {
                                        const resultFormObj: Record<string, string> = {};
                                        (<Record<string, unknown>[]>this.children.fields).forEach(item => {
                                            const key = Object.keys(item)[0];
                                            const inputFieldBlock = item[key] as Record<string, Record<string, unknown>>;
                                            const imputFieldInput = inputFieldBlock.children.input;
                                            const inputElem = (<Record<string, unknown>>imputFieldInput)._element as HTMLInputElement;
                                            resultFormObj[inputElem.name] = inputElem.value;
                                        });
                                        try {
                                            const changeData = new ChangeData(resultFormObj);
                                            await changeData.request();
                                            this.setProps({
                                                errorText: null
                                            })
                                            const userResp = await checkUserLogged();
                                            try {
                                                const currentUser = JSON.parse(userResp.response);
                                                store.set('currentUser', currentUser, StoreEvents.UserLogged);
                                            } catch {
                                                //
                                            }
                                            // createDefChildren();

                                        } catch (err) {
                                            this.setProps({
                                                errorText: (<Error>err).message
                                            })
                                        }
                                    }

                                }
                            }
                        })
                        this.children.buttons = [{ saveDataButton }, { cancelButton }];
                        this.setProps({
                            buttonsChanged: true
                        })
                    }
                }
            })

            const changePasswordButton = new Button('', {
                settings: { withInternalID: true },
                buttonText: 'Изменить пароль',
                classList: ['form-button'],
                events: {
                    click: (event: Event) => {
                        event.preventDefault();
                        const fields = prepareFields(fieldSets.changePassword, true) as Record<string, unknown>[];
                        this.children.fields = fields;
                        const savePasswordButton = new Button('', {
                            settings: { withInternalID: true },
                            buttonText: 'Сохранить пароль',
                            classList: ['form-button', 'form-button_main'],
                            events: {
                                click: async (e: Event) => {
                                    e.preventDefault();
                                    const formIsValid = this.validate();
                                    if (formIsValid) {
                                        const resultFormObj: Record<string, string> = {};
                                        (<Record<string, unknown>[]>this.children.fields).forEach(item => {
                                            const key = Object.keys(item)[0];
                                            const inputFieldBlock = item[key] as Record<string, Record<string, unknown>>;
                                            const imputFieldInput = inputFieldBlock.children.input as Record<string, unknown>;
                                            const inputElem = imputFieldInput._element as HTMLInputElement;
                                            resultFormObj[inputElem.name] = inputElem.value;
                                        });
                                        delete resultFormObj.newPasswordAgain;
                                        try {
                                            const changePassword = new ChangePassword(resultFormObj);
                                            await changePassword.request();
                                            this.setProps({
                                                errorText: null
                                            })
                                            createDefChildren();

                                        } catch (err) {
                                            this.setProps({
                                                errorText: (<Error>err).message
                                            })
                                        }
                                    }

                                }
                            }
                        })
                        this.children.buttons = [{ savePasswordButton }, { cancelButton }];
                        this.setProps({
                            buttonsChanged: true
                        })
                    }
                }
            })

            const logoutButton = new Button('', {
                settings: { withInternalID: true },
                buttonText: 'Выйти',
                classList: ['form-button', 'form-button--red'],
                events: {
                    click: async (event: Event) => {
                        event.preventDefault();
                        const logoutRequest = new LogoutRequest();

                        try {
                            await logoutRequest.request();

                            store.clearState();

                            const router = new Router();
                            router.go("/");

                        } catch (err) {
                            alert(err);
                        }
                    }
                }
            })

            buttons.push({ changeDataButton }, { changePasswordButton }, { logoutButton });
            return buttons;
        }

        super(props);

        this.validate = () => {
            let formIsValid = true;
            let passw: string | null;
            (<Record<string, unknown>[]>this.children.fields).forEach(item => {
                const key = Object.keys(item)[0];
                const inputFieldBlock = item[key] as Record<string, unknown | (()=> unknown)>;
                const imputFieldInput = (<Record<string, unknown>>inputFieldBlock.children).input as Record<string, unknown>;
                const inputElem = imputFieldInput._element as HTMLInputElement;
                if (inputElem.name === 'newPassword') passw = inputElem.value;
                const validationResult = fieldValidation(inputElem.name, inputElem.value);
                if (!validationResult.success) formIsValid = false;
                (<Record<string, (<T extends Record<string, unknown>>(arg: T)=> unknown)>>inputFieldBlock).setProps(validationResult);
                if (validationResult.success && inputElem.name === 'newPasswordAgain' && inputElem.value !== passw) {
                    (<Record<string, (<T extends Record<string, unknown>>(arg: T)=> unknown)>>inputFieldBlock).setProps({ success: false, errorText: 'Пароли не совпадают' });
                    formIsValid = false;
                }
            });
            return formIsValid;
        }

        const createDefChildren = () => {
            const buttons = createDefButtons();
            this.children.buttons = buttons;
            
            const fields = createDefFields((<Record<string, unknown>>this.props).userData as Record<string, string>);
            this.children.fields = fields;
            this.setProps({
                buttonsChanged: true
            })
        }

        const initData = () => {
            const userData = store.getState('currentUser');
            if (userData) {
                this.setProps({
                    userData
                })
                createDefChildren();
            }
        }

        initData();
    }
}
