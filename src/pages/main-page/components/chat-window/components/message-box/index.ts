import './message-box.scss';
export { default as MessageBox } from './message-box.hbs?raw';

import { messagesData } from './messagesData';

import Handlebars from 'handlebars';

Handlebars.registerHelper('messages', (param) => {
    const data: Record<string, any> = {
        messagesData: messagesData
    }
    return data[param];
});

import * as Components from './components';

Object.entries(Components).forEach(([ name, component ]) => {
  Handlebars.registerPartial(name, component);
});