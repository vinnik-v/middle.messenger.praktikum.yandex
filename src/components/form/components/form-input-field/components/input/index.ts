import './input.scss';
import Block from "../../../../../../classes/Block";

export default class InputElem extends Block {
    constructor(props: Record<string, string | string[] | Record<string, | Block | boolean | ((event: Event) => unknown)> | { name: string, value: string}[]>) {
        const tagName = {
            tagName: 'input'
        }
        const className = {
            className: 'form-input-field__input'
        }
        super('', {...tagName, ...className, ...props});
    }
}
