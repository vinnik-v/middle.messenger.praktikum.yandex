import './main-page.scss';
import MainPageTemplate from './main-page.hbs?raw';
import Block from '../../classes/Block';
import ChatList from './components/chat-list';
import ChatWindow from './components/chat-window';
import Modal from '../../components/modal';
import ModalContent from '../../components/modal/components/modal-content';
import Form from '../../components/form';
import GetChats from './main-page-api/GetChats';
import store, { StoreEvents } from '../../classes/Store';

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
      const chatsRequest = new GetChats();
      try {
        const result = await chatsRequest.request();
        let data;

        try {
          data = JSON.parse(result.response);
        } catch {}

        const chats = data && Array.isArray(data) ? data : [];
        store.set('chats', chats, StoreEvents.ChatsUpdated);
      } catch (err) {
        alert(err);
      }
    }

    store.on(StoreEvents.ChatsUpdated, () => {
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
              'addUser'
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
              'deleteUser'
            )
          }) as Block
        })
      } as Record<string, Block>
      this.setProps({
        dataLoaded: true, ...children
      })
    });

    this.apiRequest();

  }
}

// function hocFunction(Component: typeof Block) {
//   return 
// } 

// export default hocFunction(Block);
