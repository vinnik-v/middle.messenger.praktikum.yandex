import Template from './modal-search-field.hbs?raw';
import './modal-search-field.scss';
import FormInputField from "../../../../components/form/components/form-input-field";
import InputElem from "../../../../components/form/components/form-input-field/components/input";
import Block from '../../../../classes/Block';

export default class ModalSearchField extends FormInputField {
    constructor(props: typeof FormInputField.prototype.props) {
        const propTemplate = Template as string;
        const tagName = {
            tagName: 'li'
        }
        const className = {
            className: 'form-input-field'
        }

        const inputElemProps = [
            { name: 'id', value: 'login' }, 
            { name: 'name', value: 'login' },
            { name: 'type', value: 'text' },
            { name: 'placeholder', value: 'Логин' },
        ]

        const input = new InputElem({
            fieldName: 'login',
            fieldLabel: 'login',
            settings: { withInternalID: true },
            className: 'form-input-field__input',
            elemProps: inputElemProps,
        }) as Block;
        
        super({input, ...tagName, ...className, ...props}, propTemplate);
    }
    
}
