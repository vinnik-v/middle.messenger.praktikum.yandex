import Block from "../../../../../../classes/Block";
import './selected-element.scss';

export default class SelectedElement extends Block<Record<string, unknown>> {
    constructor(props: typeof Block.prototype.props) {
        const tagName = 'li';
        const className = 'selected-user__row'
        super('<div class="selected-user__name">{{{ selectedUser }}}{{{ button }}}</div>', {tagName, className, ...props})
    }
}
