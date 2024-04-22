import Block from "../../../../classes/Block";
import FormTemplate from "./delete-chat-form.hbs?raw";
import Button from "../../../../components/button";
import DeleteChat from "../../main-page-api/DeleteChat";
import store from "../../../../classes/Store";
import EventBus from "../../../../classes/EventBus";

export default class DeleteChatForm extends Block {
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

        eventBus.on('submit', async () => {
            const currentChat = store.getState('selectedChatId') as number;

            const data = {
                chatId: currentChat
            } as Record<string, number>
            await this.apiRequest(data);
            const dropdown = document.getElementById('delete-chat-modal');
            if (dropdown) {
                if (dropdown.classList.contains('display-none')) dropdown.classList.remove('display-none');
                else dropdown.classList.add('display-none');
            }

            store.emit('ChatDeleted');
        })

        const submitButton = new Button('', {
            buttonText: 'Удалить чат',
            settings: { withInternalID: true },
            classList: ['form-button', 'form-button_main'],
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
                    const dropdown = document.getElementById('delete-chat-modal');
                    if (dropdown) {
                        if (dropdown.classList.contains('display-none')) dropdown.classList.remove('display-none');
                        else dropdown.classList.add('display-none');
                    }
                }
            }
        }) as Block;

        super(template, { ...tagName, buttons: [{ submitButton }, { cancelButton }], ...{ events: events } as Record<string, Record<string, ((event: Event) => unknown)>>, ...props });

        this.apiRequest = async (data: Record<string, number>) => {
            const apiRequest = new DeleteChat(data);

            return apiRequest.request();
        }
    }
}
