import * as Pages from '../pages';
import Handlebars from 'handlebars';

export default function router() {
    // Проверяем не оканчивается ли роут на "/", удаляем лишний символ если это так
    const regex = /^\/.+\/$/;
    const pathname = window.location.pathname.match(regex) ? window.location.pathname.slice(0, -1) : window.location.pathname;
    switch (pathname) {
        case '/': 
        case '/login': 
        navigate('login');
        break;
        case '/register': 
        navigate('register');
        break;
        case '/error': 
        navigate('error');
        break;
        case '/main': 
        navigate('main');
        break;
        case '/profile': 
        navigate('profile');
        break;
        case '/404': 
        navigate('404');
        break;
        default: 
        navigate('404');
        window.location.pathname = '/404'
    }
}
const pages: Record<string, any[]> = {
    'login': [ Pages.LoginPage ],
    'register': [ Pages.RegisterPage ],
    '404': [ Pages.NotFoundPage ],
    'error': [ Pages.ErrorPage ],
    'main': [ Pages.MainPage ],
    'profile': [ Pages.ProfilePage ],
};

export function navigate(page: string) {
    const [ source, args ] = pages[page];
    const handlebarsFunct = Handlebars.compile(source);
    document.body.innerHTML = handlebarsFunct(args);
}

