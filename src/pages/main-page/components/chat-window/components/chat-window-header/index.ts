import './chat-window-header.scss';
export { default as ChatWindowHeader } from './chat-window-header.hbs?raw';

import headerButton from './assets/icons/header-button-icon.svg?raw';
import addButtonIcon from './assets/icons/add-button.svg?raw';
import deleteButtonIcon from './assets/icons/delete-button.svg?raw';
import Handlebars from 'handlebars';

Handlebars.registerHelper('headerButton', () => {
    return headerButton;
});

Handlebars.registerHelper('addButtonIcon', () => {
  return addButtonIcon;
});

Handlebars.registerHelper('deleteButtonIcon', () => {
  return deleteButtonIcon;
});