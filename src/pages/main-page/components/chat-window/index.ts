import './chat-window.scss';
import ChatWindowTemplate from './chat-window.hbs?raw';
import Block from '../../../../classes/Block';
import ChatWindowHeader from './components/chat-window-header';
import ChatWindowFooter from './components/chat-window-footer';
import MessageBox from './components/message-box';
import store, { StoreEvents } from '../../../../classes/Store';
import * as types from '../../../../types/types';
// import ChatSession from '../../../../classes/ChatSession';
import GetChatUsers from '../../main-page-api/GetChatUsers';

export default class ChatWindow extends Block {
  constructor(props: typeof Block.prototype.props) {
    const template = ChatWindowTemplate as string;
    const className = {
      className: 'chat-window'
    }
    const tagName = {
      tagName: 'section'
    }

    super(template, { chatSelected: false, ...tagName, ...className, ...props });

    store.on(StoreEvents.ChatSelected, async () => {
      getChatUsers();
    })

    store.on(StoreEvents.ChatUsersChanged, async () => {
      getChatUsers();
    })

    const getChatUsers = async () => {
      const chatId = store.getState('selectedChatId') as number;
      const chats = store.getState('chats') as types.IChatItem[]
      const { title, avatar } = chats.filter(item => item.id === chatId)[0];

      const chatUsersReq = new GetChatUsers(chatId);
      let chatUsers = [];
      try {
        const chatUsersRes = await chatUsersReq.request();
        chatUsers = JSON.parse(chatUsersRes.response);
      } catch {
        //
      }

      store.updateChatData(chatId, 'users', chatUsers);

      const children = {
        chatWindowHeader: new ChatWindowHeader({chatId, title, avatar, settings: { withInternalID: true } }),
        messageBox: new MessageBox({ settings: { withInternalID: true } }),
        chatWindowFooter: new ChatWindowFooter({ settings: { withInternalID: true } })
      } as Record<string, Block>

      this.setProps({
        ...children, chatSelected: true
      })
    }

  }
}
