import './chat-window.scss';
export { default as ChatWindow } from './chat-window.hbs?raw';
import Handlebars from 'handlebars';

Handlebars.registerHelper('chat-content', (param) => {
    const data: Record<string, any> = {
        noData: `<div class="chat-window__no-data-text">Выберите чат чтобы отправить сообщение</div>`
    }
    return data[param];
});

import headerButton from './assets/icons/header-button-icon.svg?raw'

Handlebars.registerHelper('headerButton', () => {
    return headerButton;
});