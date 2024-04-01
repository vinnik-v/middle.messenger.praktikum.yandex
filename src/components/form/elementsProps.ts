const fields = {
    login: { fieldName: 'login', fieldLabel: 'Логин', placeholder: 'Логин', inputType: 'text', value: 'ivanivanov' },
    password: { fieldName: 'password', fieldLabel: 'Пароль', placeholder: 'Пароль', inputType: 'password', value: 'ivanivanov' },
    email: { fieldName: 'email', fieldLabel: 'Почта', placeholder: 'Почта', inputType: 'email', value: 'pochta@yandex.ru' },
    first_name: { fieldName: 'first_name', fieldLabel: 'Имя', placeholder: 'Имя', inputType: 'text', value: 'Иван' },
    second_name: { fieldName: 'second_name', fieldLabel: 'Фамилия', placeholder: 'Фамилия', inputType: 'text', value: 'Иванов' },
    phone: { fieldName: 'phone', fieldLabel: 'Телефон', placeholder: '+7 (000) 000-00-00', inputType: 'tel', value: '+7 (909) 967 30 30' },
    password_again: { fieldName: 'password-again', fieldLabel: 'Пароль еще раз', placeholder: 'Пароль', inputType: 'password', value: 'ivanivanov' },
    display_name: { fieldName: 'display_name', fieldLabel: 'Имя в чате', placeholder: 'Имя в чате', inputType: 'text', value: 'Иван' },
}
export const fieldSets: Record<string, Record<string, string>[]> = {
    login: [
        fields.login,
        fields.password,
    ],
    register: [
        fields.email,
        fields.login,
        fields.first_name,
        fields.second_name,
        fields.phone,
        fields.password,
        fields.password_again,
    ],
    profileForm: [
        fields.email,
        fields.login,
        fields.first_name,
        fields.second_name,
        fields.display_name,
        fields.phone,
    ],
    changePassword: [
        fields.password,
        fields.password_again,
    ],
    addUser: [
        fields.login
    ],
    deleteUser: [
        fields.login
    ],
}

export const buttonsSets: Record<string, Record<string, string>[]> = {
    login: [
        { buttonType: 'submit', buttonText: 'Войти', redirectPage: 'main', buttonClassName: 'form-button_main'},
        { buttonType: 'button', buttonText: 'Нет аккаунта?', redirectPage: 'register' }
    ],
    register: [
        { buttonType: 'submit', buttonText: 'Зарегистрироваться', redirectPage: 'main', buttonClassName: 'form-button_main'},
        { buttonType: 'button', buttonText: 'Войти', redirectPage: 'login' }
    ],
    addUser: [
        { buttonType: 'submit', buttonText: 'Добавить', redirectPage: 'main', buttonClassName: 'form-button_main'}
    ],
    deleteUser: [
        { buttonType: 'submit', buttonText: 'Удалить', redirectPage: 'main', buttonClassName: 'form-button_main'}
    ],
    profileForm: [
        { buttonType: 'submit', buttonText: 'Сохранить', redirectPage: 'profile', buttonClassName: 'form-button_main'},
        { buttonType: 'button', buttonText: 'Изменить данные' },
        { buttonType: 'button', buttonText: 'Изменить пароль' },
        { buttonType: 'button', buttonText: 'Выйти', redirectPage: 'login', buttonClassName: 'form-button--red' }
    ]
}
