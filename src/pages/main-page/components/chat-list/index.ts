import './chat-list.scss';
import ChatListTemplate from './chat-list.hbs?raw';
import Block from '../../../../classes/Block';
import ChatListHeader from './components/chat-list-header';
import ChatCard from './components/chat-card';
import store, { StoreEvents } from '../../../../classes/Store';
import { IChatItem } from '../../../../types/types';
import Button from '../../../../components/button';
// import dropdownClickListener from '../../../../functions/dropdownClickListener';

export default class ChatList extends Block {
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
          click: (e) => {
            e.preventDefault();
            const dropdown = document.getElementById('add-chat-modal');
            if (dropdown) {
              if (dropdown.classList.contains('display-none')) dropdown.classList.remove('display-none');
              else dropdown.classList.add('display-none');
            }
          }
        } 
      })
    } as Record<string, Block>


    super(template, { ...tagName, ...{ chats: chats } as Record<string, Record<string, Block>[]>, ...children, ...className, ...props });

    function prepareData() {
      const chatsData = store.getState('chats') as IChatItem[];
      
      const chats = chatsData.map((item, index) => {
        const ChatCardName: string = 'chat_' + (index + 1);
        const value = new ChatCard({
          ...item as Record<string, string | Date | boolean | number>,
          settings: { withInternalID: true },
          events: {
            click() {
              const selectedChatId = store.getState('selectedChatId');
              if (!selectedChatId || selectedChatId !== item.id) {
                store.set('selectedChatId', item.id, StoreEvents.ChatSelected);
              }
              
            }
          }
        }) as Block;
        return { [ChatCardName]: value };
      }) as Record<string, Block>[];

      return chats;
    }

    store.on(StoreEvents.ChatsUpdated, () => {
      const chats = prepareData();
      this.setProps({
        chats: chats
      })
    })

  }
}
