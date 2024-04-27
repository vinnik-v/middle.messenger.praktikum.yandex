import UserRowTemplate from './user-row.hbs?raw';
import Block from "../../../../../../classes/Block";

export default class UserRow extends Block<Record<string, unknown>> {
    constructor(props: typeof Block.prototype.props) {
        const tagName = 'li';
        super(UserRowTemplate, {tagName, ...props});
    }
}
