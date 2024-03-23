import './message-box.scss';
import MessageBoxTemplate from './message-box.hbs?raw';
import Block from '../../../../../../classes/Block';

import { messagesData } from './messagesData';

export default class MessageBox extends Block {
  constructor(props: Record<string, string | string[] | Record<string, ((event: Event) => unknown) | boolean> | { name: string, value: string }[]>) {
    const template = MessageBoxTemplate as string;
    const className = {
      className: 'message-box'
    }
    const tagName = {
      tagName: 'div'
    }

    super(template, { ...tagName, ...className, ...props });

  }
}