import './main-page.scss';
import MainPageTemplate from './main-page.hbs?raw';
import Block from '../../classes/Block';
import ChatList from './components/chat-list';
import ChatWindow from './components/chat-window';
import Modal from '../../components/modal';
import ModalContent from '../../components/modal/components/modal-content';
import Form from '../../components/form';
import { fieldSets, buttonsSets } from '../../components/form/elementsProps';
export default class MainPage extends Block {
    constructor(props: Record<string, string | string[] | Record<string, ((event: Event)=>unknown) | boolean> | { name: string, value: string}[]>) {
        const template = MainPageTemplate as string;
        const classList = {
            classList: ['main-container', 'main-page']
        }
        const tagName = {
            tagName: 'main'
        }
        const children = {
            chatList: new ChatList({ settings: { withInternalID: true } }),
            chatWindow: new ChatWindow({ settings: { withInternalID: true } }),
            addUserModal: new Modal({
                settings: { withInternalID: true },
                elemProps: [{ name: 'id', value: 'add-user-modal' }],
                modalContent: new ModalContent('{{{ form }}}', {
                  settings: { withInternalID: true },
                  form: new Form({
                    classList: ['modal__form'],
                    formTitle: 'Добавить пользователя',
                    settings: { withInternalID: true }
                  },
                  fieldSets.addUser,
                  buttonsSets.addUser
                  ) 
                }) as Block
              }),
              deleteUserModal: new Modal({
                settings: { withInternalID: true },
                elemProps: [{ name: 'id', value: 'delete-user-modal' }],
                modalContent: new ModalContent('{{{ form }}}', {
                  settings: { withInternalID: true },
                  form: new Form({
                    classList: ['modal__form'],
                    formTitle: 'Удалить пользователя',
                    settings: { withInternalID: true }
                  },
                  fieldSets.deleteUser,
                  buttonsSets.deleteUser
                  ) 
                }) as Block
              })
        } as Record<string, Block>

        super(template, {...tagName, ...children, ...classList, ...props});
        
    }
}

