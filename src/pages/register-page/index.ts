import './register-page.scss';
import RegisterPageTemplate from './register-page.hbs?raw';
import Block from '../../classes/Block';
import RegisterPageForm from './register-page-form/RegisterPageForm';

export default class RegisterPage extends Block<Record<string, unknown>> {
    
    constructor(props: Record<string, string | string[] | Record<string, ((event: Event)=>unknown) | boolean> | { name: string, value: string}[]>) {
        const template = RegisterPageTemplate as string;
        const classList = {
            classList: ['main-container', 'registration-page']
        }
        const children = {
            form: new RegisterPageForm({
                classList: ['registration-page__form'],
                formTitle: 'Регистрация',
                settings: { withInternalID: true }
            }, 
            'register'
            )
        } as Record<string, unknown>
        const tagName = {
            tagName: 'main'
        }
        super(template, {...tagName, ...classList, ...children, ...props});
        
    }
}

