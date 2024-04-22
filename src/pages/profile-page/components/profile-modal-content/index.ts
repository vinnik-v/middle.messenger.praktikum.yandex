import ProfileModalContentTemplate from './profile-modal-content.hbs?raw';
import Block from '../../../../classes/Block';
import Button from '../../../../components/button';
import InputElem from '../../../../components/form/components/form-input-field/components/input';
import EventBus from '../../../../classes/EventBus';
import ChangeAvatar from '../profile/profile-api/ChangeAvatar';
import store, { StoreEvents } from '../../../../classes/Store';
import checkUserLogged from '../../../../functions/checkUserLogged';

export default class ProfileModalContent extends Block<Record<string, unknown>> {
    constructor(props: typeof Block.prototype.props) {

        const tagName = 'form';
        const modalTitle = 'Загрузите файл';
        const labelText = 'Выберите файл на компьютере';
        
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
                try {
                    await this.apiRequest(data);
                    this.setProps({
                        errorText: null,
                        file: null
                    })
                    const userResp = await checkUserLogged();
                    const dropdown = document.getElementById('change-profile-photo-modal');
                    eventBus.emit('inputChanged');
                    if (dropdown) {
                        if (dropdown.classList.contains('display-none')) dropdown.classList.remove('display-none');
                        else dropdown.classList.add('display-none');
                    }
                    try {
                        const currentUser = JSON.parse(userResp.response);
                        store.set('currentUser', currentUser, StoreEvents.UserLogged);
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

        const input = new InputElem({
            settings: { withInternalID: true },
            elemProps: [
                { name: 'type', value: 'file' },
                { name: 'id', value: 'avatar-change-input' },
                { name: 'name', value: 'avatar' },
                { name: 'style', value: 'display:none' }
            ],
            events: {
                change: (e: Event) => {
                    const target = e.target as HTMLInputElement;
                    const files = target.files;
                    if (files && files.length > 0) {
                        const fileName = files[0].name;
                        const fileLabel = document.getElementById('file-input-label');
                        if (fileLabel) {
                            this.setProps({
                                labelText: fileName,
                                file: files[0]
                            })
                        }
                        eventBus.emit('inputChanged');
                    }
                },
                submit: async (event: Event) => {
                    event.preventDefault();
                    return false;
                }
            }
        })

        const events = {
            click: (e: Event) => {
                const elem = e.target as HTMLElement;
                if (elem && elem.id === 'file-input-label') {
                    const input = document.getElementById('avatar-change-input');
                    if (input) {
                        input.click();
                    }
                }
            }
        }

        const cancelButton = new Button('', {
            buttonText: 'Отмена',
            settings: { withInternalID: true },
            classList: ['form-button'],
            events: {
                click: (e: Event) => {
                    e.preventDefault();
                    const dropdown = document.getElementById('change-profile-photo-modal');
                    if (dropdown) {
                        if (dropdown.classList.contains('display-none')) dropdown.classList.remove('display-none');
                        else dropdown.classList.add('display-none');
                    }
                }
            }
        });

        super(ProfileModalContentTemplate, { tagName, modalTitle, labelText, events, buttons: [{ submitButton }, { cancelButton }], input: [{ input }], ...props })
        
        this.apiRequest = async (data: FormData) => {
            const apiRequest = new ChangeAvatar(data);

            return apiRequest.request();
        }
    }
}
