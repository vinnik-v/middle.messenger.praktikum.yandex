import './chat-list.scss';
import ChatListTemplate from './chat-list.hbs?raw';
import Block from '../../../../classes/Block';
import ChatListHeader from './components/chat-list-header';
import ContactCard from './components/contact-card';
import { chatListData } from './chatListData';

export default class ChatList extends Block {
  constructor(props: Record<string, string | string[] | Record<string, ((event: Event) => unknown) | boolean> | { name: string, value: string }[]>) {
    const template = ChatListTemplate as string;
    const className = {
      className: 'chat-list'
    }
    const tagName = {
      tagName: 'nav'
    }
    const contacts = chatListData.map((item, index) => {
      const contactCardName: string = 'contsct_' + (index + 1);
      const value = new ContactCard({
        ...item as Record<string, string | Date | boolean | number>,
        settings: { withInternalID: true },
        events: {
          // Названия события точно такие же, как и у первого аргумента addEventListener: 
          mouseenter: (event: Event) => {
            console.log(event);
          }
        }
      }) as Block;
      return { [contactCardName]: value };
    }) as Record<string, Block>[];

    const children = {
      chatListHeader: new ChatListHeader({ settings: { withInternalID: true } }),
    } as Record<string, Block>


    super(template, { ...tagName, ...{ contacts: contacts } as Record<string, Record<string, Block>[]>, ...children, ...className, ...props });

  }
}
