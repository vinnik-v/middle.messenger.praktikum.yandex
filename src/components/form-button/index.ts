import './form-button.scss';
import FormButtonTemplate from './form-button.hbs?raw';
import Block from '../../classes/Block';

export default class FormButton extends Block {
    constructor(
            props: Record<string, string | string[] | Record<string, | ((event: Event)=>unknown) | boolean> | { name: string, value: string}[]>
        ) {
        const template = FormButtonTemplate as string;
        const tagName = {
            tagName: 'button'
        }
        props.classList ? (<string[]>props.classList).push('form-button') : props.classList = ['form-button'];
        super(template, {...tagName, ...props});
    }
}
