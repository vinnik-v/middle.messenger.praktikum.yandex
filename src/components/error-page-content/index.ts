import './error-page-content.scss';
export { default as ErrorPageContent } from './error-page-content.hbs?raw';
import template from './test.hbs?raw';

import Handlebars from 'handlebars';

Handlebars.registerHelper('error-content', (param) => {
    const values: Record<string, Record<string, string>> = {
        404: { header: '404', text: 'Страница не найдена', buttonText: 'Назад к чатам', redirectPage: 'main' },
        error: { header: '500', text: 'Мы уже фиксим', buttonText: 'Назад к чатам', redirectPage: 'main' }
    }
    return values[param];
});

import Block from '../../classes/Block';

// console.log(elem)

// const handlebarsFunct = Handlebars.compile(elem);

// const props = {
//     header: 'хуй пизда джигурда'
// }
// const t = handlebarsFunct(props)

// console.log(t)


export default class ErrorPageContent1 extends Block {
    constructor(props: Record<string, string>) {
        // Создаём враппер дом-элемент button
        super(template, props);
    }
}

// const button = new Button({
//     text: 'Click me'
// });