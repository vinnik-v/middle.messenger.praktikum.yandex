import './message-box.scss';
import MessageBoxTemplate from './message-box.hbs?raw';
import Block from '../../../../../../classes/Block';
import Message from './components/message';
import store from '../../../../../../classes/Store';
import { messagesData } from './messagesData';

export default class MessageBox extends Block {
  constructor(props: Record<string, string | string[] | Record<string, Block>[] | Record<string, ((event: Event) => unknown) | boolean> | { name: string, value: string }[]>) {
    const template = MessageBoxTemplate as string;
    const className = {
      className: 'message-box'
    }
    const tagName = {
      tagName: 'div'
    }

    const selectedChatId = store.getState('selectedChatId') as number;
    const chatSessionKey  = 'chat_session_'+selectedChatId

    const chatSession = store.getChatSession(chatSessionKey);
    if (chatSession && chatSession.socket && chatSession.socket.readyState === 1) {
      chatSession.send('Привет')
    } else {
      chatSession.on('Connected', () => {
        chatSession.send(JSON.stringify({
          content: '0',
          type: 'get old',
        })); 
      })
    }

    chatSession.on('MessageIn', (data) => {
      console.log('MessageIn');
      console.log(data);
    })

    const messages = messagesData.map((item, index) => {
      const messageName: string = 'message_' + (index + 1);
      const classList: string[] = [];
      item.messageClassName ? classList.push(item.messageClassName) : undefined;
      const value = new Message({
        ...item as Record<string, string | Date | boolean | null>,
        classList,
        settings: { withInternalID: true },
      }) as Block;
      return { [messageName]: value };
    }) as Record<string, Block>[];

    super(template, { ...tagName, ...{ messages: messages } as Record<string, Record<string, Block>[]>, ...className, ...props });
  }
}
