import './main-page.scss';
import MainPageTemplate from './main-page.hbs?raw';
import Block from '../../classes/Block';
import ChatList from './components/chat-list';
import ChatWindow from './components/chat-window';
import Modal from '../../components/modal';
import ModalContent from '../../components/modal/components/modal-content';
import GetChats from './main-page-api/GetChats';
import store, { StoreEvents } from '../../classes/Store';
import AddChatForm from './components/add-chat-form';
import AddUserForm from './components/add-user-form';
import DeleteUserForm from './components/delete-user-form';
import DeleteChatForm from './components/delete-chat-form';

export default class MainPage extends Block {
  constructor(props: typeof Block.prototype.props) {
    const template = MainPageTemplate as string;
    const classList = {
      classList: ['main-container', 'main-page']
    }
    const tagName = {
      tagName: 'main'
    }

    super(template, { ...tagName, ...classList, ...props });

    this.apiRequest = async () => {

      this.children = {};
      this.setProps({
        dataLoaded: false 
      })

      const chatsRequest = new GetChats();
      try {
        const result = await chatsRequest.request();
        let data;

        try {
          data = JSON.parse(result.response);
        } catch {
          //
        }

        const chats = data && Array.isArray(data) ? data : [];
        store.set('chats', chats, StoreEvents.ChatsUpdated);
      } catch {
        //
      }
    }

    store.on(StoreEvents.ChatDeleted, () => {
      this.apiRequest();
    })

    store.on(StoreEvents.ChatsUpdated, () => {
      const children = {
        chatList: new ChatList({ settings: { withInternalID: true } }),
        chatWindow: new ChatWindow({ settings: { withInternalID: true } }),
        addUserModal: new Modal({
          settings: { withInternalID: true },
          elemProps: [{ name: 'id', value: 'add-user-modal' }],
          modalContent: new ModalContent('{{{ form }}}', {
            settings: { withInternalID: true },
            form: new AddUserForm({
              classList: ['modal__form'],
              formTitle: 'Добавить пользователя',
              settings: { withInternalID: true }
            }
            )
          }) as Block
        }),
        deleteUserModal: new Modal({
          settings: { withInternalID: true },
          elemProps: [{ name: 'id', value: 'delete-user-modal' }],
          modalContent: new ModalContent('{{{ form }}}', {
            settings: { withInternalID: true },
            form: new DeleteUserForm({
              classList: ['modal__form'],
              formTitle: 'Удалить пользователя',
              settings: { withInternalID: true }
            }
            )
          }) as Block
        }),
        addChatModal: new Modal({
          settings: { withInternalID: true },
          elemProps: [{ name: 'id', value: 'add-chat-modal' }],
          modalContent: new ModalContent('{{{ form }}}', {
            settings: { withInternalID: true },
            form: new AddChatForm({
              classList: ['modal__form'],
              formTitle: 'Создать чат',
              settings: { withInternalID: true }
            },
              'addChat'
            )
          }) as Block
        }),
        chatDeleteConfirmModal: new Modal({
          settings: { withInternalID: true },
          elemProps: [{ name: 'id', value: 'delete-chat-modal' }],
          modalContent: new ModalContent('{{{ form }}}', {
            settings: { withInternalID: true },
            form: new DeleteChatForm({
              classList: ['modal__form'],
              formTitle: 'Подтвердите удаление чата',
              settings: { withInternalID: true }
            })
          }) as Block
        }),
      } as Record<string, Block>;

      this.setProps({
        dataLoaded: true, ...children
      })
    });

    console.log(store.getState());
    const currentUser = store.getState('currentUser');
    if (currentUser) {
      this.apiRequest();
    }
    

    this.show = function() {
      console.log('asd');
      this.apiRequest();
      this._render()
    }

  }
}
