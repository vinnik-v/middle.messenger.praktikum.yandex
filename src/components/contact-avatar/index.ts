import './contact-avatar.scss';
export { default as ContactAvatar } from './contact-avatar.hbs?raw';

import Handlebars from 'handlebars';

import avatarIcon from './assets/icons/avatar-icon.svg?raw'

Handlebars.registerHelper('avatarIcon', () => {
    return avatarIcon;
});