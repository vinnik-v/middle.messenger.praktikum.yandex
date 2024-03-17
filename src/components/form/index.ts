import Handlebars from 'handlebars';
import * as Components from './components';

Object.entries(Components).forEach(([ name, component ]) => {
  Handlebars.registerPartial(name, component);
});

Handlebars.registerHelper('form-fields', (param) => {
    const fieldSets: Record<string, unknown> = {
        login: [
            { fieldName: 'login', fieldLabel: 'Логин', placeholder: 'Логин', inputType: 'text', errorText: 'Неверный логин', value: 'ivanivanov' },
            { fieldName: 'password', fieldLabel: 'Пароль', placeholder: 'Пароль', inputType: 'password', errorText: 'Неверный пароль', value: 'ivanivanov' }
        ],
        register: [
            { fieldName: 'email', fieldLabel: 'Почта', placeholder: 'Почта', inputType: 'email', value: 'pochta@yandex.ru' },
            { fieldName: 'login', fieldLabel: 'Логин', placeholder: 'Логин', inputType: 'text', value: 'ivanivanov' },
            { fieldName: 'first_name', fieldLabel: 'Имя', placeholder: 'Имя', inputType: 'text', value: 'Иван' },
            { fieldName: 'second_name', fieldLabel: 'Фамилия', placeholder: 'Фамилия', inputType: 'text', value: 'Иванов' },
            { fieldName: 'phone', fieldLabel: 'Телефон', placeholder: '+7 (000) 000-00-00', inputType: 'tel', value: '+7 (909) 967 30 30' },
            { fieldName: 'password', fieldLabel: 'Пароль', placeholder: 'Пароль', inputType: 'password', value: 'ivanivanov' },
            { fieldName: 'password', fieldLabel: 'Пароль еще раз', placeholder: 'Пароль', inputType: 'password', errorText: 'Пароли не совпадают', value: 'ivanivanov' },
        ],
        addUser: [
            { fieldName: 'login', fieldLabel: 'Логин', placeholder: 'Логин', inputType: 'text', value: 'ivanivanov' }
        ],
        deleteUser: [
            { fieldName: 'login', fieldLabel: 'Логин', placeholder: 'Логин', inputType: 'text', value: 'ivanivanov' }
        ],
    }
    return fieldSets[param];
});

Handlebars.registerHelper('form-button', (param) => {
    const buttons: Record<string, unknown> = {
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
