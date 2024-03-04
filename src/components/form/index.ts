import Handlebars from 'handlebars';
import * as Components from './components';

Object.entries(Components).forEach(([ name, component ]) => {
  Handlebars.registerPartial(name, component);
});

import './form.scss';
export { default as Form } from './form.hbs?raw';