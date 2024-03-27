import './message.scss';
import MessageTemplate from './message.hbs?raw';
import Block from '../../../../../../../../classes/Block';

import messagePhoto from './assets/img/message-photo.png';

import messageReadIcon from './assets/icons/message-read-icon.svg?raw';
import messageUnreadIcon from './assets/icons/message-unred-icon.svg?raw';

export default class Message extends Block {
    constructor(props: Record<string, string | File | string[] | Record<string, ((event: Event) => unknown) | boolean> | { name: string, value: string }[]>) {
      const template = MessageTemplate as string;
      const className = {
        className: 'message-container'
      }
      const tagName = {
        tagName: 'div'
      }
      const icons = {
        messageReadIcon,
        messageUnreadIcon,
      }
  
      super(template, {...icons, ...{ messageTimeClass: 'message__date--dark' }, ...{ messagePhoto: messagePhoto }, ...tagName, ...className, ...props });
    }
  }
  
