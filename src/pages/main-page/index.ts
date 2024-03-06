import './main-page.scss';
export { default as MainPage } from './main-page.hbs?raw';

import Handlebars from 'handlebars';
import * as Components from './components';

Object.entries(Components).forEach(([ name, component ]) => {
  Handlebars.registerPartial(name, component);
});