import './input.scss';
import Block from "../../../../../../classes/Block";
export default class InputElem extends Block<Record<string, unknown>> {
    constructor(props: typeof Block.prototype.props) {
        const tagName = {
            tagName: 'input'
        }
        const className = {
            className: 'form-input-field__input'
        }
        super('', { ...tagName, ...className, ...props });
    }
}
