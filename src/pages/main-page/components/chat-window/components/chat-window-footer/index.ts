import './chat-window-footer.scss';
export { default as ChatWindowFooter } from './chat-window-footer.hbs?raw';

import attachFileIcon from './assets/icons/attach-file-icon.svg?raw';
import sendMessageIcon from './assets/icons/send-message-icon.svg?raw';
import Handlebars from 'handlebars';

import fileIcon from './assets/icons/file-icon.svg?raw';
import locationIcon from './assets/icons/location-icon.svg?raw';
import photoIcon from './assets/icons/photo-icon.svg?raw';

Handlebars.registerHelper('fileIcon', () => {
    return fileIcon;
});

Handlebars.registerHelper('locationIcon', () => {
    return locationIcon;
});

Handlebars.registerHelper('photoIcon', () => {
    return photoIcon;
});

Handlebars.registerHelper('attachFileIcon', () => {
    return attachFileIcon;
});

Handlebars.registerHelper('sendMessageIcon', () => {
    return sendMessageIcon;
});
