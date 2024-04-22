import Block from "../../../../classes/Block";
import FormTemplate from "./delete-user-form.hbs?raw";
import './delete-user-form.scss';
import Button from "../../../../components/button";
import DeleteUser from "../../main-page-api/DeleteUser";
import store from "../../../../classes/Store";
import EventBus from "../../../../classes/EventBus";
import { IChatItem } from "../../../../types/types";
import UserRow from "./components/user-row";
import CheckBoxElem from "./components/checkbox-elem";

export default class DeleteUserForm extends Block {
    constructor(
        props: typeof Block.prototype.props
    ) {

        const template = FormTemplate as string;
        const tagName = {
            tagName: 'form'
        }
        const events = {
            submit: async (event: Event) => {
                event.preventDefault();
                return false;
            }
        }
        props.classList = ['form'];

        const eventBus = new EventBus();

        eventBus.on('dataChecked', ()=> {
            const submitButton = (<Record<string, Block>[]>this.children.buttons).find(item => item.submitButton);
            const toDeleteIds = this.props.toDeleteIds as number[];
            if (submitButton) {
                if (toDeleteIds.length === 0) {
                    submitButton.submitButton._element.classList.add('form-button_main-disabled');
                } else {
                    submitButton.submitButton._element.classList.remove('form-button_main-disabled');
                }
            }
        })

        eventBus.on('submit', async () => {
            const toDeleteIds = this.props.toDeleteIds as number[];
            if (toDeleteIds.length > 0) {

                const currentChat = store.getState('selectedChatId') as number;

                const data = {
                    users: toDeleteIds,
                    chatId: currentChat
                } as Record<string, number[] | number>
                await this.apiRequest(data);
                const dropdown = document.getElementById('delete-user-modal');
                if (dropdown) {
                    if (dropdown.classList.contains('display-none')) dropdown.classList.remove('display-none');
                    else dropdown.classList.add('display-none');
                }
                this.setProps({
                    toDeleteIds: []
                })
                store.emit('ChatUsersChanged');
            }
        })

        const submitButton = new Button('', {
            buttonText: 'Удалить',
            settings: { withInternalID: true },
            classList: ['form-button', 'form-button_main', 'form-button_main-disabled'],
            disabled: true,
            events: {
                click: (e) => {
                    e.preventDefault();
                    eventBus.emit('submit');
                }
            }

        }) as Block

        const cancelButton = new Button('', {
            buttonText: 'Отмена',
            settings: { withInternalID: true },
            classList: ['form-button'],
            events: {
                click: (e) => {
                    e.preventDefault();
                    const dropdown = document.getElementById('delete-user-modal');
                    if (dropdown) {
                        if (dropdown.classList.contains('display-none')) dropdown.classList.remove('display-none');
                        else dropdown.classList.add('display-none');
                    }
                }
            }
        }) as Block;

        super(template, { ...tagName, toDeleteIds: [], buttons: [{ submitButton }, { cancelButton }], ...{ events: events } as Record<string, Record<string, ((event: Event) => unknown)>>, ...props });

        store.on('ChatUpdated', ()=> {
            const currentChatId = store.getState('selectedChatId') as number;
            const chats = store.getState('chats') as IChatItem[];
            const currentChat = currentChatId ? chats.filter(item => item.id === currentChatId)[0] : null;
            const chatUsersArr = currentChat && currentChat.users ? currentChat.users : [];

            const noUsers = chatUsersArr.length === 0;

            const chatUsers = chatUsersArr.map((item, index) => {
                const checkboxId = 'delete-user-checkbox_'+ index;
                const userName = `${item.login} (${item.first_name + ' ' + item.second_name})`
                
                const checkbox = new CheckBoxElem({
                    settings: { withInternalID: true },
                    userId: item.id,
                    elemProps: [{ name: 'type', value: 'checkbox' }, { name: 'id', value:checkboxId },  { name: 'name', userName }],
                    events: {
                        click: (e) => {
                            const checkbox = e.target as HTMLInputElement;
                            const checked = checkbox.checked;
                            let toDeleteIds = [...this.props.toDeleteIds as number[]];
                            if (checked) {
                                if (!toDeleteIds.includes(item.id)) {
                                    toDeleteIds.push(item.id);
                                }
                            } else {
                                toDeleteIds = toDeleteIds.filter(id => id !== item.id);
                            }
                            this.setProps({
                                toDeleteIds
                            })
                            eventBus.emit('dataChecked');
                        }
                    }
                });

                const userRow = new UserRow({
                    settings: { withInternalID: true },
                    userId: item.id,
                    userName,
                    checkboxId,
                    checkbox: [{checkbox}],
                })
                return { [checkboxId]: userRow };
            })

            this.setProps({
                noUsers,
                chatUsers
            })
        })

        this.apiRequest = async (data: Record<string, number[] | number>) => {
            const apiRequest = new DeleteUser(data);

            return apiRequest.request();
        }
    }
}
