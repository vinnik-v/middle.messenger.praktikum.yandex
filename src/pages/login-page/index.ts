import './login-page.scss';
import LoginPageTemplate from './login-page.hbs?raw';
import Block from '../../classes/Block';
import Form from '../../components/form';
import { fieldSets, buttonsSets } from '../../components/form/elementsProps'; 


export default class LoginPage extends Block {
    
    constructor(props: Record<string, string | string[] | Record<string, ((event: Event)=>unknown) | boolean> | { name: string, value: string}[]>) {
        const template = LoginPageTemplate as string;
        const classList = {
            classList: ['main-container', 'login-page']
        }
        const fieldsProps = fieldSets.login;
        const buttonsProps = buttonsSets.login;

        const children = {
            form: new Form({
                classList: ['login-page__form'],
                formTitle: 'Вход',
                settings: { withInternalID: true }
            }, 
            fieldsProps, 
            buttonsProps
            )
        } as Record<string, Block>
        const tagName = {
            tagName: 'main'
        }
        super(template, {...tagName, ...classList, ...children, ...props});
        
    }
}

