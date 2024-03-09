import './profile.scss';
export { default as Profile } from './profile.hbs?raw';

import Handlebars from 'handlebars';

import profileNoPhotoIcon from './assets/icons/no-photo-icon.svg?raw';

Handlebars.registerHelper('profileNoPhotoIcon', () => {
    return profileNoPhotoIcon;
});

import * as Components from './components';

Object.entries(Components).forEach(([ name, component ]) => {
  Handlebars.registerPartial(name, component);
});


