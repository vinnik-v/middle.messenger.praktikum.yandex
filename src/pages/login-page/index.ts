import './login-page.scss';
import LoginPageTemplate from './login-page.hbs?raw';
import Block from '../../classes/Block';
import LoginPageForm from './login-page-form';

export default class LoginPage extends Block<Record<string, unknown>> {
    
    constructor(props: Record<string, string | string[] | Record<string, ((event: Event)=>unknown) | boolean> | { name: string, value: string}[]>) {
        const template = LoginPageTemplate as string;
        const classList = {
            classList: ['main-container', 'login-page']
        }
        
        const children = {
            form: new LoginPageForm({
                classList: ['login-page__form'],
                formTitle: 'Вход',
                settings: { withInternalID: true }
            }, 
            'login'
            )
        }
        const tagName = {
            tagName: 'main'
        }
        super(template, {...tagName, ...classList, ...children, ...props});
        
    }
}

