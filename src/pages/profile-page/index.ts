import './profile-page.scss';
export { default as ProfilePage } from './profile-page.hbs?raw';
import Handlebars from 'handlebars';

import buttonBack from './assets/icons/button-back.svg?raw';

Handlebars.registerHelper('buttonBack', () => {
    return buttonBack;
});

import * as Components from './components';

Object.entries(Components).forEach(([ name, component ]) => {
  Handlebars.registerPartial(name, component);
});
