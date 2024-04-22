import './form-input-field.scss';
import FormInputFieldTemplate from './form-input-field.hbs?raw';
import Block from '../../../../classes/Block';
import fieldValidation from '../../../../functions/fieldValidation';

type TProps = Record<string, string | null | boolean | Record<string, unknown>[] | Record<string, | boolean | ((event: Event) => unknown)>>
export default class FormInputField extends Block<TProps> {
    constructor(props: typeof Block.prototype.props, propTemplate?: string) {
        const template = propTemplate ? propTemplate : FormInputFieldTemplate as string;
        const tagName = {
            tagName: 'li'
        }
        const className = {
            className: 'form-input-field'
        }
        
        super(template, {...tagName, ...className, ...props});

        this.eventBus().on('inputBlur', <T>(args: T) => {
            const Args = args as Record<string, unknown>[];
            const elem = Args[0];
            const field = elem._element as HTMLInputElement;
            const valid = fieldValidation(field.name, field.value);
            this.setProps({
                errorText: valid.errorText,
                fieldValid: valid.success
            })
        });
        
        for (const key in this.children) {
            const child = this.children[key] as Record<string, ((event: Record<string, Record<string, ((event: Event) => unknown)>>) => unknown)>;
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

