import './form-input-field.scss';
import FormInputFieldTemplate from './form-input-field.hbs?raw';
import Block from '../../../../classes/Block';

export default class FormInputField extends Block {
    constructor(props: Record<string, string | string[] | Record<string, | Function | boolean> | { name: string, value: string}[]>) {
        const template = FormInputFieldTemplate as string;
        const tagName = {
            tagName: 'li'
        }
        const className = {
            className: 'form-input-field'
        }
        super(template, {...tagName, ...className, ...props});
    }
}