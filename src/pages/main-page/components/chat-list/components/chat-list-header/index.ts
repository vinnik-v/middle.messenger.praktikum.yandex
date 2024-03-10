import './chat-list-header.scss';
export { default as ChatListHeader } from './chat-list-header.hbs?raw';
import Handlebars from 'handlebars';

import headerButtonIcon from './assets/icons/header-menu-button.svg?raw';
import searchIcon from './assets/icons/search-icon.svg?raw';

Handlebars.registerHelper('headerButtonIcon', () => {
    return headerButtonIcon;
});

Handlebars.registerHelper('searchIcon', () => {
    return searchIcon;
});
