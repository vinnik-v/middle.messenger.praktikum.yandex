import Block from "../../../../../../classes/Block";

export default class CheckBoxElem extends Block {
    constructor(props: typeof Block.prototype.props) {
        const tagName = 'input';
        super('', {tagName, ...props});
    }
}
