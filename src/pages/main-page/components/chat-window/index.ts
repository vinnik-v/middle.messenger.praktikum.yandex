import './chat-window.scss';
import ChatWindowTemplate from './chat-window.hbs?raw';
import Block from '../../../../classes/Block';
import ChatWindowHeader from './components/chat-window-header';
import ChatWindowFooter from './components/chat-window-footer';
import MessageBox from './components/message-box';

export default class ChatWindow extends Block {
  constructor(props: Record<string, string | string[] | Record<string, ((event: Event) => unknown) | boolean> | { name: string, value: string }[]>) {
    const template = ChatWindowTemplate as string;
    const className = {
      className: 'chat-window'
    }
    const tagName = {
      tagName: 'section'
    }
    const children = {
      chatWindowHeader: new ChatWindowHeader({ settings: { withInternalID: true } }),
      messageBox: new MessageBox({ settings: { withInternalID: true } }),
      chatWindowFooter: new ChatWindowFooter({ settings: { withInternalID: true } })
    } as Record<string, Block>
    
    super(template, { ...tagName, ...children, ...className, ...props });

  }
}

// import Handlebars from 'handlebars';

// Handlebars.registerHelper('chat-content', (param) => {
//     const data: Record<string, string> = {
//         noData: `<div class="chat-window__no-data-text">Выберите чат чтобы отправить сообщение</div>`
//                  <p class="chat-window__no-data-text">Выберите чат чтобы отправить сообщение</p>
//     }
//     return data[param];
// });

// import * as Components from './components';

// Object.entries(Components).forEach(([ name, component ]) => {
//   Handlebars.registerPartial(name, component);
// });
