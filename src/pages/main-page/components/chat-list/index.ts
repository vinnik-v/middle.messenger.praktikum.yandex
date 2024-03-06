import './chat-list.scss';
export { default as ChatList } from './chat-list.hbs?raw';

import Handlebars from 'handlebars';
import * as Components from './components';

Object.entries(Components).forEach(([ name, component ]) => {
  Handlebars.registerPartial(name, component);
});