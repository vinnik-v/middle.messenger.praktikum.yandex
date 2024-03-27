import './register-page.scss';
import RegisterPageTemplate from './register-page.hbs?raw';
import Block from '../../classes/Block';
import Form from '../../components/form';
import { fieldSets, buttonsSets } from '../../components/form/elementsProps';

export default class RegisterPage extends Block {
    
    constructor(props: Record<string, string | string[] | Record<string, ((event: Event)=>unknown) | boolean> | { name: string, value: string}[]>) {
        const template = RegisterPageTemplate as string;
        const classList = {
            classList: ['main-container', 'registration-page']
        }
        const children = {
            form: new Form({
                classList: ['registration-page__form'],
                formTitle: 'Регистрация',
                settings: { withInternalID: true }
            }, 
            fieldSets.register, 
            buttonsSets.register
            )
        } as Record<string, Block>
        const tagName = {
            tagName: 'main'
        }
        super(template, {...tagName, ...classList, ...children, ...props});
        
    }
}

