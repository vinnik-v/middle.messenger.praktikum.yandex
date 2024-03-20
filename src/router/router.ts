import * as Pages from '../pages';
import Handlebars from 'handlebars';
import Block from '../classes/Block';
import { FormButton } from '../components';

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
const pages: Record<string, string[]> = {
    'login': [Pages.LoginPage],
    'register': [Pages.RegisterPage],
    '404': [Pages.NotFoundPage],
    'error': [Pages.ErrorPage],
    'main': [Pages.MainPage],
    'profile': [Pages.ProfilePage],
};

export function navigate(page: string) {
    const [source, args] = pages[page];
    
    const handlebarsFunct = Handlebars.compile(source);
    const root = document.querySelector('.app');
    (<HTMLElement>root).innerHTML = handlebarsFunct(args);

    class Button extends Block {
        constructor(props: Record<string, string | Block | Record<string, Function | boolean>>) {
            // Создаём враппер дом-элемент button
            const template = `<button class="form-button{{#if buttonClassName }} {{ buttonClassName }}{{/if}}" {{#if redirectPage }} page="{{redirectPage}}"{{/if}} {{#if id }} id="{{id}}"{{/if}} >
                                {{ buttonText }}
                            </button>`//FormButton;
           
            super(template, props);
        }
    }
    class Div extends Block {
        
        constructor(props: Record<string, string | Block | Record<string, Function | boolean>>) {
            // Создаём враппер дом-элемент button
            const template = `<div class="some-div" >
                                <div>Здесь написано что-то умное</div>
                                <h3>{{ title }}</h3>
                                {{{ button }}}
                              </div>`//FormButton;
           
            super(template, props);
        }
        // componentDidUpdate(oldProps, newProps) {
        //     if (oldProps.buttonText !== newProps.buttonText) {
        //         this.children.button.setProps({ text: newProps.buttonText });
        //     }
    
        //     return true;
        // }
    }

    function render(query: string, block: Block) {
        const root = document.querySelector(query);
        // console.log('sdfsdfsdf', block.getContent());
        (<HTMLElement>root).appendChild(block.getContent());
        return root;
    }

    const div = new Div({
        title: 'Вот такой распрекрасный div',
        events: {
            // Названия события точно такие же, как и у первого аргумента addEventListener: 
            mouseenter: (event: Event) => {
              console.log(event);
            },
        },
        settings: { withInternalID: true },
        button: new Button({ buttonText: 'Войти', redirectPage: 'main', buttonClassName: 'form-button_main',settings: { withInternalID: true }, events: {
            // Названия события точно такие же, как и у первого аргумента addEventListener: 
            mouseenter: (event: Event) => {
                console.log('asdasdasdasd');
            },
        },})
        
    });

    // app — это class дива в корне DOM
    render(".app", div);

    // Через секунду контент изменится сам, достаточно обновить пропсы
    setTimeout(() => {
        console.log(div.props);
        div.setProps({
            title: 'ggggfhfgfgfg'
        });
        div.children.button.setProps({
            buttonText: 'Выйти'
        });
    }, 1000);
}

