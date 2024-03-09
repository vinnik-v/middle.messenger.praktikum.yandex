import './message.scss';
export { default as Message } from './message.hbs?raw';
import Handlebars from 'handlebars';
import messagePhoto from './assets/img/message-photo.png';

import messageReadIcon from './assets/icons/message-read-icon.svg?raw';
import messageUnreadIcon from './assets/icons/message-unred-icon.svg?raw';

Handlebars.registerHelper('messageReadIcon', () => {
    return messageReadIcon;
});

Handlebars.registerHelper('messageUnreadIcon', () => {
    return messageUnreadIcon;
});

Handlebars.registerHelper('messageTimeClass', (param) => {
    return param ? 'message__date--dark' : '';
});

Handlebars.registerHelper('messagePhoto', () => {
    return messagePhoto;
});


