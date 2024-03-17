import './profile-form.scss';
export { default as ProfileForm } from './profile-form.hbs?raw';

import Handlebars from 'handlebars';

import * as Components from './components';

Object.entries(Components).forEach(([ name, component ]) => {
  Handlebars.registerPartial(name, component);
});
