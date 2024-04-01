export default function fieldValidation (fieldName: string, value: string) {
    let success = true;
    let errorText: string | null = null;
    switch (fieldName) {
        case 'login':
            if (!value) {
                success = false;
                errorText = 'Не указан логин';
            } else {
                success = valueValidation(value, /^[a-zA-Z0-9_-]+$/);
                if (!success) errorText = 'Недопустимые символы';
            }
            break;
        case 'password-again':
        case 'password':
            if (!value) {
                success = false;
                errorText = 'Не указан пароль';
            } else {
                success = valueValidation(value, /^[a-zA-Z0-9!@#$%^&*()[\]_-]+$/);
                if (!success) errorText = 'Недопустимые символы';
            }
            break;
        case 'email':
            if (!value) {
                success = false;
                errorText = 'Не указан email';
            } else {
                success = valueValidation(value, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
                if (!success) errorText = 'Поле не соответствует формату';
            }
            break;
        case 'first_name':
            if (!value) {
                success = false;
                errorText = 'Не указано имя';
            } else {
                success = valueValidation(value, /^[а-яА-Яa-zA-Z]+$/);
                if (!success) errorText = 'Недопустимое значение';
            }
            break;
        case 'second_name':
            if (!value) {
                success = false;
                errorText = 'Не указана фамилия';
            } else {
                success = valueValidation(value, /^[а-яА-Яa-zA-Z]+$/);
                if (!success) errorText = 'Недопустимое значение';
            }
            break;
        case 'phone':
            if (!value) {
                success = false;
                errorText = 'Не указан телефон';
            } else {
                success = valueValidation(value, /^\+?[0-9]{1,4}[-\s]?\(?[0-9]{1,3}\)?[-\s]?[0-9]{3}[-\s]?[0-9]{2}[-\s]?[0-9]{2}$/);
                if (!success) errorText = 'номер не соответствует формату';
            }
            break;
        default: undefined;
    }

    return {
        success,
        errorText
    }
}

const valueValidation = (value: string, regex: RegExp) => {
    if (regex.test(value)) {
        return true;
    } else {
        return false;
    }
}
