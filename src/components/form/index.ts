import './form.scss';
import FormTemplate from './form.hbs?raw';
import FormInputField from './components/form-input-field/index.ts'
import FormButton from '../form-button/index.ts';
import Block from '../../classes/Block.ts';
import { fieldSets, buttonsSet } from './elementsProps.ts';
export default class Form extends Block {
    constructor(
            props: Record<string, string | string[] | Record<string, | ((event: Event)=>unknown) | boolean | Record<string, Block>[]> | { name: string, value: string}[]>, 
            fieldSetName: string, 
            buttonsSetName: string
            ) 
        {
        const fieldsProps = fieldSets[fieldSetName] as Record<string, string>[];
        // const fields: Record<string, FormInputField> = {};
        const fields = fieldsProps.map((item, index) => {
            const fieldName: string = 'field_'+(index+1);
            const value = new FormInputField({
                fieldName: item.fieldName,
                fieldLabel: item.fieldLabel,
                inputType: item.inputType,
                placeholder: item.placeholder,
                value: item.value,
                errorText: item.errorText,                
                settings: { withInternalID: true },
            }) as Block;
            return { [fieldName]: value };
        }) as Record<string, Block>[];

        const buttonsProps = buttonsSet[buttonsSetName] as Record<string, string>[];

        // const buttons: Record<string, FormButton> = {};
        const buttons = buttonsProps.map((item, index) => {
            const buttonName: string = 'form-button_'+(index+1);
            const value = new FormButton({
                className: item.buttonClassName, 
                buttonText: item.buttonText, 
                elemProps: [{ name: 'page', value: item.redirectPage }, { name: 'id', value: buttonName }], 
                settings: { withInternalID: true }, 
                events: {
                    // Названия события точно такие же, как и у первого аргумента addEventListener: 
                    mouseenter: (event: Event) => {
                        console.log(event);
                    }
                }
            }) as Block;
            return { [buttonName]: value };
        }) as Record<string, Block>[];
        const template = FormTemplate as string;
        const tagName = {
            tagName: 'form'
        }
        props.classList ? (<string[]>props.classList).push('form') : props.classList = ['form'];
        super(template, {...tagName, ...{ fields: fields } as Record<string, Record<string, Block>[]>, ...{ buttons: buttons } as Record<string, Record<string, Block>[]>, ...props});
        
    }
}

