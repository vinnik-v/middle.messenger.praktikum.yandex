import './error-page-content.scss';
export { default as ErrorPageContent } from './error-page-content.hbs?raw';

import Handlebars from 'handlebars';

Handlebars.registerHelper('error-content', (param) => {
    const values: Record<string, any> = {
        404: { header: '404', text: 'Страница не найдена', buttonText: 'Назад к чатам', redirectPage: 'main' },
        error: { header: '500', text: 'Мы уже фиксим', buttonText: 'Назад к чатам', redirectPage: 'main' }
    }
    return values[param];
});