import './message-box.scss';
import MessageBoxTemplate from './message-box.hbs?raw';
import Block from '../../../../../../classes/Block';
import Message from './components/message';
import store from '../../../../../../classes/Store';
import dateToString from '../../../../../../functions/dateToString';
import { IUser } from '../../../../../../types/types';
import DateRow from './components/date-row';

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
      getOld();
    } else {
      chatSession.on('Connected', () => {
        getOld();
      })
    }

    chatSession.on('DataReceived', (data) => {
      const inpData = data as Record<string, string | number | boolean>[][];
      const inpMessages = inpData[0];

      inpMessages.sort((a, b) => new Date(a.time as string) > new Date(b.time as string) ? 1 : -1);

      let lastDate: string | null = '';
      const messages: Record<string, Block>[] = [];

      inpMessages.forEach(item => {
        const currentDate = dateToString(item.time as string, 'date');
        if (!lastDate || currentDate !== lastDate) {
          lastDate = currentDate;
          const dateRow = {
            [lastDate]: new DateRow({
              settings: { withInternalID: true },
              date: lastDate
            })
          }
          messages.push(dateRow);
        }
        const element = createMessageElem(item);
        messages.push(element);
      })

      this.setProps({
        messages,
        lastDate
      });
      scrollDown()
    })

    chatSession.on('MessageIn', (data) => {
      const inpData = data as Record<string, string | number | boolean>[];
      const inpMessage = inpData[0];
      const prevMessages = this.props.messages? this.props.messages as Record<string, Block>[] : [];
      const messages = [...prevMessages];

      let lastDate = this.props.lastDate;
      const currentDate = dateToString(inpMessage.time as string, 'date');
      if (!lastDate || currentDate !== lastDate) {
        lastDate = currentDate;
        const dateRow = {
          [lastDate]: new DateRow({
            settings: { withInternalID: true },
            date: lastDate
          })
        }
        messages.push(dateRow);
      }

      const message = createMessageElem(inpMessage);
      messages.push(message);
      this.setProps({
        messages,
        lastDate
      })
      scrollDown()
    })

    super(template, { ...tagName, ...className, ...props });

    function getOld() {
      chatSession.send({
        content: '0',
        type: 'get old',
      }); 
    }
    function createMessageElem(item: Record<string, string | number | boolean>) {
      const messageName: string = 'message_' + item.id;
        const classList: string[] = [];
        const currentUserId = (<IUser>store.getState('currentUser')).id;
        item.messageFromMe = currentUserId === item.user_id;
        item.messageFromMe ? classList.push('message--from-me') : undefined;
        item.messageTime = dateToString(item.time as string, 'timeNoSecs');
        const value = new Message({
          ...item as Record<string, string | number | Date | boolean | null>,
          classList,
          settings: { withInternalID: true },
        }) as Block;
        return { [messageName]: value };
    }

    
    // Вызываем функцию прокрутки вниз при загрузке страницы
    window.onload = scrollDown();

    function scrollDown() {
      const scrollingContainer = document.getElementById("messages");
      scrollingContainer ? scrollingContainer.scrollTop = scrollingContainer.scrollHeight : undefined;
      return null;
    };
  }
}
