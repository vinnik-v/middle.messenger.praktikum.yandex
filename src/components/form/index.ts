import Handlebars from 'handlebars';
import * as Components from './components';

Object.entries(Components).forEach(([ name, component ]) => {
  Handlebars.registerPartial(name, component);
});

Handlebars.registerHelper('form-fields', (param) => {
    const fieldSets: Record<string, any> = {
        login: [
            { fieldName: 'Логин', placeholder: 'Логин', inputType: 'text', errorText: 'Неверный логин', value: 'ivanivanov' },
            { fieldName: 'Пароль', placeholder: 'Пароль', inputType: 'password', errorText: 'Неверный пароль', value: 'ivanivanov' }
        ],
        register: [
            { fieldName: 'Почта', placeholder: 'Почта', inputType: 'email', value: 'pochta@yandex.ru' },
            { fieldName: 'Логин', placeholder: 'Логин', inputType: 'text', value: 'ivanivanov' },
            { fieldName: 'Имя', placeholder: 'Имя', inputType: 'text', value: 'Иван' },
            { fieldName: 'Фамилия', placeholder: 'Фамилия', inputType: 'text', value: 'Иванов' },
            { fieldName: 'Телефон', placeholder: '+7 (000) 000-00-00', inputType: 'tel', value: '+7 (909) 967 30 30' },
            { fieldName: 'Пароль', placeholder: 'Пароль', inputType: 'password', value: 'ivanivanov' },
            { fieldName: 'Пароль еще раз', placeholder: 'Пароль', inputType: 'password', errorText: 'Пароли не совпадают', value: 'ivanivanov' },
        ],
        addUser: [
            { fieldName: 'Логин', placeholder: 'Логин', inputType: 'text', value: 'ivanivanov' }
        ],
        deleteUser: [
            { fieldName: 'Логин', placeholder: 'Логин', inputType: 'text', value: 'ivanivanov' }
        ],
    }
    return fieldSets[param];
});

Handlebars.registerHelper('form-button', (param) => {
    const buttons: Record<string, any> = {
        login: [
            { buttonText: 'Войти', redirectPage: 'main', buttonClassName: 'form-button_main'},
            { buttonText: 'Нет аккаунта?', redirectPage: 'register' }
        ],
        register: [
            { buttonText: 'Зарегистрироваться', redirectPage: 'main', buttonClassName: 'form-button_main'},
            { buttonText: 'Войти', redirectPage: 'login' }
        ],
        addUser: [
            { buttonText: 'Добавить', redirectPage: 'main', buttonClassName: 'form-button_main'}
        ],
        deleteUser: [
            { buttonText: 'Удалить', redirectPage: 'main', buttonClassName: 'form-button_main'}
        ],
    }
    return buttons[param];
});

import './form.scss';
export { default as Form } from './form.hbs?raw';