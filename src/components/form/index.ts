import './form.scss';
import FormTemplate from './form.hbs?raw';
import Block from '../../classes/Block.ts';
import fieldValidation from '../../functions/fieldValidation.ts';
import Router from '../../classes/Router.ts';
import prepareFields from './functions/prepareFields.ts';
import prepareButtons from './functions/prepareButtons.ts';
import { fieldSets, buttonsSets } from '../../components/form/elementsProps'; 

export default class Form extends Block {
    constructor(
            props: typeof Block.prototype.props, 
            formType?: string
            ) 
        {

        const fieldsProps = formType? fieldSets[formType] : undefined;
        const buttonsProps = formType? buttonsSets[formType] : undefined;

        fieldsProps ? props.fields = prepareFields(fieldsProps) : undefined;
        buttonsProps ? props.buttons = prepareButtons(buttonsProps) : undefined;
        
        const template = FormTemplate as string;
        const tagName = {
            tagName: 'form'
        }
        const events = {
            submit: async (event: Event)=> {
                event.preventDefault();
                const formIsValid = this.validate();
                if (formIsValid) {
                    const resultFormObj: Record<string, string> = {};
                    (<Record<string, Block>[]>this.children.fields).forEach(item => {
                        const key = Object.keys(item)[0];
                        const inputFieldBlock = item[key];
                        const imputFieldInput = inputFieldBlock.children.input as Block;
                        const inputElem = imputFieldInput._element as HTMLInputElement;
                        resultFormObj[inputElem.name] = inputElem.value;
                    });
                    try {
                        await this.apiRequest(resultFormObj);
                        
                        const submitButton = (<Record<string, Block>[]>this.children.buttons).find(item => {
                            const key = Object.keys(item)[0];
                            const elem = item[key] as Block;
                            return elem.props.buttonType && elem.props.buttonType === 'submit';
                        })

                        if (submitButton) {
                            const key = Object.keys(submitButton)[0];
                            const elem = submitButton[key] as Block;
                            const redirectPage = elem.props.redirectPage as string;
                            if (redirectPage) {
                                const router = new Router();
                                router.go(redirectPage);
                            }
                        }
                        
                    } catch(err) {
                        this.setProps({
                            errorText: (<Error>err).message
                        })
                    }
                }
                return false;
            }
        }
        props.classList ? (<string[]>props.classList).push('form') : props.classList = ['form'];
        super(template, {...tagName, ...{ events: events } as Record<string, Record<string, ((event: Event)=>unknown)>>, ...props});
        this.validate = ()=> {
            let formIsValid = true;
            let passw: string | null;
            (<Record<string, Block>[]>this.children.fields).forEach(item => {
                const key = Object.keys(item)[0];
                const inputFieldBlock = item[key];
                const imputFieldInput = inputFieldBlock.children.input as Block;
                const inputElem = imputFieldInput._element as HTMLInputElement;
                if (inputElem.name === 'password') passw = inputElem.value;
                const validationResult = fieldValidation(inputElem.name,inputElem.value);
                if (!validationResult.success) formIsValid = false;
                inputFieldBlock.setProps(validationResult);
                if (validationResult.success && inputElem.name === 'password-again' && inputElem.value !== passw) {
                    inputFieldBlock.setProps({ success: false, errorText: 'Пароли не совпадают'});
                    formIsValid = false;
                }
            });
            return formIsValid;
        }
    }
}

