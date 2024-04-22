import Block from "../../../../classes/Block";
import FormTemplate from "./add-user-form.hbs?raw";
import './add-user-form.scss';
import fieldValidation from "../../../../functions/fieldValidation";
import Button from "../../../../components/button";
import AddUser from "../../main-page-api/AddUser";
import SearchUser from "../../main-page-api/SearchUser";
import InputElem from "../../../../components/form/components/form-input-field/components/input";
import SearchResultRow from "./components/search-result-row";
import SelectedElement from "./components/selected-element";
import store from "../../../../classes/Store";
import EventBus from "../../../../classes/EventBus";
export default class AddUserForm extends Block<Record<string, unknown>> {
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

        eventBus.on('inputChanged', () => {
            this.validate();
        })

        eventBus.on('usersChanged', () => {
            const submitButton = (<Record<string, Record<string, unknown>>[]>this.children.buttons).find(item => item.submitButton);
            const selectedUsers = this.props.selectedUsers as Record<string, unknown>[];
            if (submitButton) {
                if (!this.props.isValid || !selectedUsers || selectedUsers.length === 0) {
                    (<HTMLElement>submitButton.submitButton._element).classList.add('form-button_main-disabled');
                } else if (this.props.isValid && selectedUsers && selectedUsers.length > 0) {
                    (<HTMLElement>submitButton.submitButton._element).classList.remove('form-button_main-disabled');
                }
            }
        })

        eventBus.on('submit', async () => {
            if (this.props.isValid && this.children.selectedUsers && (<Record<string, unknown>[]>this.children.selectedUsers).length > 0) {
                
                const userIds = (<Record<string, Record<string, Record<string, unknown>>>[]>this.children.selectedUsers).map(item => {
                    const value = Object.values(item)[0];
                    return value.props.elemId;
                });

                const currentChat = store.getState('selectedChatId') as number;

                const data = {
                    users: userIds,
                    chatId: currentChat
                } as Record<string, number[] | number>
                await this.apiRequest(data);
                const dropdown = document.getElementById('add-user-modal');
                if (dropdown) {
                    if (dropdown.classList.contains('display-none')) dropdown.classList.remove('display-none');
                    else dropdown.classList.add('display-none');
                }
                this.setProps({
                    selectedUsers: [],
                    isValid: false,
                    showSelectedUsers: false
                })
                eventBus.emit('usersChanged');
                store.emit('ChatUsersChanged');
            }
        })

        const input = new InputElem({
            settings: { withInternalID: true },
            elemProps: [{ name: 'placeholder', value: 'Поиск пользователя' }],
            events: {
                input: async (e: Event) => {
                    e.preventDefault();
                    const value = (<HTMLInputElement>e.target).value;
                    eventBus.emit('inputChanged');
                    if (value && this.props.isValid) {
                        (<HTMLElement>e.target).focus();
                        const data = {
                            login: value
                        }
                        const searchReq = new SearchUser(data);
                        try {
                            const searchRes = await searchReq.request();
                            const users = JSON.parse(searchRes.response) as Record<string, string | number>[];

                            const noResult = users.length === 0;

                            const searchResult = users.map((item, index) => {
                                const userLogin: string = item.login ? item.login as string : 'user_' + (index + 1);
                                const userName = `${item.login} (${item.first_name + ' ' + item.second_name})`
                                const value = new SearchResultRow({
                                    userName: userName,
                                    settings: { withInternalID: true },
                                    elemProps: [{ name: 'id', value: String(item.id) }],
                                    elemId: item.id,
                                    events: {
                                        click: (e: Event) => {
                                            e.preventDefault();
                                            const selectedUsers = this.props.selectedUsers ? this.props.selectedUsers as Record<string, unknown>[] : [];

                                            const userSelected = selectedUsers.find(userItem => {
                                                const value = Object.values(userItem)[0] as Record<string, Record<string, unknown>>;
                                                return value.props.elemId === item.id;
                                            })
                                            if (!userSelected) {
                                                const deleteButton = new Button('', {
                                                    settings: { withInternalID: true },
                                                    events: {
                                                        click: (e: Event) => {
                                                            e.preventDefault();
                                                            deleteSelectedItem(item.id as number);
                                                        }
                                                    }
                                                })
                                                const selectedUser = {
                                                    ['selectedUser_' + item.id]: new SelectedElement({
                                                        settings: { withInternalID: true },
                                                        selectedUser: userName,
                                                        elemId: item.id,
                                                        button: [{ deleteButton }] as Record<string, unknown>[],
                                                    }) as unknown
                                                }
                                                selectedUsers.push(selectedUser);
                                                const showSelectedUsers = selectedUsers.length > 0;
                                                this.setProps({
                                                    selectedUsers,
                                                    showSelectedUsers
                                                })
                                            }
                                            eventBus.emit('usersChanged');
                                        }
                                    }
                                });
                                return { [userLogin]: value };
                            }) as Record<string, unknown>[];

                            this.setProps({
                                noResult,
                                showSearchResult: true,
                                searchResult: searchResult
                            });

                            (<HTMLElement>e.target).focus();

                        } catch {
                            // 
                        }
                    } else {
                        this.setProps({
                            showSearchResult: false,
                            searchResult: []
                        });
                        (<HTMLElement>e.target).focus();
                    }

                }
            }
        });

        const submitButton = new Button('', {
            buttonText: 'Добавить',
            settings: { withInternalID: true },
            classList: ['form-button', 'form-button_main', 'form-button_main-disabled'],
            disabled: true,
            events: {
                click: (e: Event) => {
                    e.preventDefault();
                    eventBus.emit('submit');
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
                    const dropdown = document.getElementById('add-user-modal');
                    if (dropdown) {
                        if (dropdown.classList.contains('display-none')) dropdown.classList.remove('display-none');
                        else dropdown.classList.add('display-none');
                    }
                }
            }
        });

        super(template, { ...tagName, selectedUsers: [], ...{ input: input }, buttons: [{ submitButton }, { cancelButton }], ...{ events: events } as Record<string, Record<string, ((event: Event) => unknown)>>, ...props });
        this.validate = () => {
            const input = this.children.input as Record<string, unknown>;
            const inputElem = input._element as HTMLInputElement;
            const validationResult = fieldValidation('login', inputElem.value);
            if (!inputElem.value) {
                this.setProps({
                    isValid: true,
                    errorText: null
                });
                return true;
            }
            if (!validationResult.success) {
                this.setProps({
                    isValid: false,
                    errorText: validationResult.errorText
                });
            } else {
                this.setProps({
                    isValid: true,
                    errorText: null
                });
            }
            return validationResult.success;
        }

        const deleteSelectedItem = (elemId: number) => {
            const selectedUsers = this.props.selectedUsers as Record<string, Record<string, Record<string, unknown>>>[];

            if (selectedUsers) {
                const filteredItems = selectedUsers.filter(userItem => {
                    const value = Object.values(userItem)[0];
                    return value.props.elemId !== elemId;
                })

                const showSelectedUsers = filteredItems.length > 0;
                this.setProps({
                    selectedUsers: filteredItems,
                    showSelectedUsers,
                    isValid: showSelectedUsers
                })
                eventBus.emit('usersChanged');
            }
        }

        this.apiRequest = async <T>(data: T) => {
            const req = new AddUser(data);

            return req.request();
        }
    }
}
