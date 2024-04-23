import './chat-list.scss';
import ChatListTemplate from './chat-list.hbs?raw';
import Block from '../../../../classes/Block';
import ChatListHeader from './components/chat-list-header';
import ChatCard from './components/chat-card';
import store, { StoreEvents } from '../../../../classes/Store';
import { IChatItem, IUser } from '../../../../types/types';
import Button from '../../../../components/button';
import dateToString from '../../../../functions/dateToString';

export default class ChatList extends Block<Record<string, unknown>> {
  constructor(props: Record<string, string | string[] | Record<string, ((event: Event) => unknown) | boolean> | { name: string, value: string }[]>) {
    const template = ChatListTemplate as string;
    const className = {
      className: 'chat-list'
    }
    const tagName = {
      tagName: 'nav'
    }

    const chats = prepareData();

    const children = {
      chatListHeader: new ChatListHeader({ settings: { withInternalID: true } }),
      button: new Button('{{ buttonText }}',{ 
        elemProps: [{ name: 'id', value: 'add-chat-button' }],
        classList: ['form-button', 'form-button_main'],
        buttonText: 'Создать чат',
        settings: { withInternalID: true },
        events: {
          click: (e: Event) => {
            e.preventDefault();
            const dropdown = document.getElementById('add-chat-modal');
            if (dropdown) {
              if (dropdown.classList.contains('display-none')) dropdown.classList.remove('display-none');
              else dropdown.classList.add('display-none');
            }
          }
        } 
      })
    }


    super(template, { ...tagName, ...{ chats: chats }, ...children, ...className, ...props });

    function prepareData() {
      const chatsData = store.getState('chats') as IChatItem[];
      
      const chats = chatsData.map((item, index) => {
        const currentUserLogin = (<IUser>store.getState('currentUser')).login;
        const messageFromMe = item.last_message?.user?.login === currentUserLogin;
        const lastMessage = item.last_message?.content;
        const lastMessageTime = item.last_message? dateToString(item.last_message.time, 'date') : null;
        const ChatCardName: string = 'chat_' + (index + 1);
        const value = new ChatCard({
          ...item as Record<string, string | Date | boolean | number>,
          settings: { withInternalID: true },
          messageFromMe,
          lastMessage,
          lastMessageTime,
          events: {
            click() {
              store.set('selectedChatId', item.id, StoreEvents.ChatSelected);
            }
          }
        });
        return { [ChatCardName]: value };
      });

      return chats;
    }

    store.on(StoreEvents.ChatsUpdated, () => {
      const chats = prepareData();
      this.setProps({
        chats: chats
      })
    })

    store.on(StoreEvents.ChatUpdated, () => {
      const chats = prepareData();
      this.setProps({
        chats: chats
      })
    })


  }
}
