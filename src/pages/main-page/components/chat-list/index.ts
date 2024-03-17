
import Handlebars from 'handlebars';
import * as Components from './components';
import { chatListData } from './chatListData';

Object.entries(Components).forEach(([ name, component ]) => {
  Handlebars.registerPartial(name, component);
});

Handlebars.registerHelper('chat-list-data', (param) => {
  const data: Record<string, any> = {
      chatListData: chatListData
  }
  return data[param];
});

import './chat-list.scss';
export { default as ChatList } from './chat-list.hbs?raw';
