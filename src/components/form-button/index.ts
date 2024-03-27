import './form-button.scss';
import FormButtonTemplate from './form-button.hbs?raw';
import Button from '../button';

export default class FormButton extends Button {
    constructor(props: typeof Button.prototype.props) {
        const template = FormButtonTemplate as string;
        props.classList ? (<string[]>props.classList).push('form-button') : props.classList = ['form-button'];
        super(template, props);
    }
}
