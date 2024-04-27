import Button from '../../../../components/button';
import EventBus from '../../../../classes/EventBus';
import ChangeChatPhoto from '../../main-page-api/ChangeChatPhoto';
import store from '../../../../classes/Store';
import ProfileModalContent from '../../../profile-page/components/profile-modal-content';

export default class ChangePhotoModalContent extends ProfileModalContent {
    constructor(props: typeof ProfileModalContent.prototype.props) {

        const submitButton = new Button('', {
            classList: ['form-button_main', 'form-button', 'form-button_main-disabled'],
            buttonText: 'Поменять',
            elemProps: [{ name: 'id', value: 'file-accept-button' }],
            settings: { withInternalID: true },
            events: {
                click: (e: Event) => {
                    e.preventDefault();
                    eventBus.emit('submit');
                }
            }
        })

        const eventBus = new EventBus();

        eventBus.on('inputChanged', ()=> {
            const submitButton = (<Record<string, Record<string, unknown>>[]>this.children.buttons).find(item => item.submitButton);
            const file = this.props.file as number[];
            if (submitButton) {
                if (file) {
                    (<HTMLElement>submitButton.submitButton._element).classList.remove('form-button_main-disabled');
                } else {
                    (<HTMLElement>submitButton.submitButton._element).classList.add('form-button_main-disabled');
                }
            }
        })

        eventBus.on('submit', async () => {
            const file = this.props.file;
            if (file) {
                const data = new FormData(this._element as HTMLFormElement);
                const chatId = store.getState('selectedChatId') as number;
                data.append('chatId', String(chatId));
                try {
                    const changePhotoRespResp = await apiRequest(data);
                    this.setProps({
                        errorText: null,
                        file: null
                    })
                    
                    const modal = document.getElementById('change-chat-photo-modal');
                    eventBus.emit('inputChanged');
                    if (modal) {
                        if (modal.classList.contains('display-none')) modal.classList.remove('display-none');
                        else modal.classList.add('display-none');
                    }
                    try {
                        const chatPhoto = JSON.parse(changePhotoRespResp.response);
                        store.updateChatData(chatId, 'avatar', chatPhoto.avatar);
                        const children = this.children as Record<string, Record<string, unknown>[]>
                        const input = children.input[0].input as Record<string, unknown>
                        (<HTMLInputElement>input._element).files = null;
                        
                        this.setProps({
                            labelText: 'Выберите файл на компьютере',
                            errorText: null,
                            file: null
                        })
                    } catch {
                        //
                    }

                } catch (err) {
                    this.setProps({
                        errorText: (<Error>err).message
                    })
                }
            }
        })

        const cancelButton = new Button('', {
            buttonText: 'Отмена',
            settings: { withInternalID: true },
            classList: ['form-button'],
            events: {
                click: (e: Event) => {
                    e.preventDefault();
                    const modal = document.getElementById('change-chat-photo-modal');
                    if (modal) {
                        if (modal.classList.contains('display-none')) modal.classList.remove('display-none');
                        else modal.classList.add('display-none');
                    }
                }
            }
        });

        super({ buttons: [{ submitButton }, { cancelButton }], ...props })
        
        const apiRequest = async (data: FormData) => {
            const apiRequest = new ChangeChatPhoto(data);

            return apiRequest.request();
        }
    }
}
