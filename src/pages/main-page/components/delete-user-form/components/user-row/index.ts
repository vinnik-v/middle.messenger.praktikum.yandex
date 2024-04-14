import UserRowTemplate from './user-row.hbs?raw';
import './user-row.scss';
import Block from "../../../../../../classes/Block";

export default class UserRow extends Block {
    constructor(props: typeof Block.prototype.props) {
        const tagName = 'li';
        super(UserRowTemplate, {tagName, ...props});
    }
}
