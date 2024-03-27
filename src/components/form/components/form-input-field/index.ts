import './form-input-field.scss';
import FormInputFieldTemplate from './form-input-field.hbs?raw';
import Block from '../../../../classes/Block';
import fieldValidation from '../../../../functions/fieldValidation';

export default class FormInputField extends Block {
    constructor(props: Record<string, string | string[] | boolean | Block | Record<string, | boolean | ((event: Event) => unknown)> | { name: string, value: string}[]>, propTemplate?: string) {
        const template = propTemplate ? propTemplate : FormInputFieldTemplate as string;
        const tagName = {
            tagName: 'li'
        }
        const className = {
            className: 'form-input-field'
        }
        
        super(template, {...tagName, ...className, ...props});

        this.eventBus().on('inputBlur', <T>(args: T) => {
            const Args = args as Block[];
            const elem = Args[0];
            const field = elem._element as HTMLInputElement;
            const valid = fieldValidation(field.name, field.value);
            this.setProps({
                errorText: valid.errorText,
                fieldValid: valid.success
            })
        });
        
        for (const key in this.children) {
            const child = this.children[key] as Block;
            child.setProps({
                events: {
                    blur: ()=> {
                        this.eventBus().emit('inputBlur', child)
                    }
                }
            })
        }
    }
}

