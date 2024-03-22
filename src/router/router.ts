import * as Pages from '../pages';
import Block from '../classes/Block';
import LoginPage from '../pages/login-page/index';

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
const pages: Record<string, Function> = {
    'login': () => new LoginPage({ settings: { withInternalID: true } }),
    'register': ()=> new LoginPage({ settings: { withInternalID: true } }),
    '404': ()=> new LoginPage({ settings: { withInternalID: true } }),
    'error': ()=> new LoginPage({ settings: { withInternalID: true } }),
    'main': ()=> new LoginPage({ settings: { withInternalID: true } }),
    'profile': ()=> new LoginPage({ settings: { withInternalID: true } }),
};

export function navigate(page: string) {
    const pageComponent = pages[page]();
    // class Button extends Block {
    //     constructor(props: Record<string, string | string[] | Block | Record<string, | Function | boolean> | { name: string, value: string}[]>) {
    //         // Создаём враппер дом-элемент button
    //         const template = `{{ buttonText }}`//FormButton;
    //         const tagName = {
    //             tagName: 'button'
    //         };
    //         super(template, { ...tagName as Record<string, string>, ...props});
    //     }
    // }
    // class Div extends Block {
        
    //     constructor(props: Record<string, string | Block | Record<string, Function | boolean>>) {
    //         // Создаём враппер дом-элемент button
    //         const template = `<div>Здесь написано что-то умное</div>
    //                         <h3>{{ title }}</h3>
    //                         {{{ button }}}`//FormButton;
           
    //         super(template, props);
    //     }
    // }

    function render(query: string, block: Block) {
        const root = document.querySelector(query);
        (<HTMLElement>root).innerHTML = '';
        (<HTMLElement>root).appendChild(block.getContent());
        return root;
    }

    

    // const div = new Div({
    //     tagName: 'div',
    //     title: 'Вот такой распрекрасный div',
    //     className: 'some-div',
    //     events: {
    //         // Названия события точно такие же, как и у первого аргумента addEventListener: 
    //         mouseenter: (event: Event) => {
    //           console.log(event);
    //         },
    //     },
    //     settings: { withInternalID: true },
    //     button: new Button(
    //         { 
    //             classList: ['form-button', 'form-button_main'], 
    //             buttonText: 'Войти', 
    //             elemProps: [{ name: 'page', value: 'main' }, { name: 'id', value: 'ываываываыва' }], 
    //             settings: { withInternalID: true }, events: {
    //                 // Названия события точно такие же, как и у первого аргумента addEventListener: 
    //                 mouseenter: (event: Event) => {
    //                     console.log('asdasdasdasd');
    //             },
    //         },})
        
    // });

    // app — это class дива в корне DOM
    render(".app", pageComponent);

    // Через секунду контент изменится сам, достаточно обновить пропсы
    setTimeout(() => {
        // console.log(div.props);
        // div.setProps({
        //     title: 'ggggfhfgfgfg'
        // });
        // div.children.button.setProps({
        //     buttonText: 'Выйти'
        // });
    }, 1000);
}

