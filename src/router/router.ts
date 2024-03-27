import Block from '../classes/Block';
import LoginPage from '../pages/login-page/index';
import RegisterPage from '../pages/register-page';
import MainPage from '../pages/main-page';
import ErrorPage from '../pages/error-page';
import NotFoundPage from '../pages/not-found-page';
import ProfilePage from '../pages/profile-page';

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
const pages: Record<string, (()=> Block)> = {
    'login': () => new LoginPage({ settings: { withInternalID: true } }),
    'register': ()=> new RegisterPage({ settings: { withInternalID: true } }),
    '404': ()=> new NotFoundPage({ settings: { withInternalID: true } }),
    'error': ()=> new ErrorPage({ settings: { withInternalID: true } }),
    'main': ()=> new MainPage({ settings: { withInternalID: true } }),
    'profile': ()=> new ProfilePage({ settings: { withInternalID: true } }),
};

export function navigate(page: string) {
    const pageComponent = pages[page]();
    
    function render(query: string, block: Block) {
        const root = document.querySelector(query);
        (<HTMLElement>root).innerHTML = '';
        (<HTMLElement>root).appendChild(block.getContent());
        return root;
    }

    render(".app", pageComponent);
    history.pushState(null, '', page);
}

