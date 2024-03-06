import './contact-card.scss';
export { default as ContactCard } from './contact-card.hbs?raw';

import Handlebars from 'handlebars';

import avatarIcon from './assets/icons/avatar-icon.svg?raw'

Handlebars.registerHelper('avatarIcon', () => {
    return avatarIcon;
});