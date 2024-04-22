import './search-result-row.scss';
import Block from "../../../../../../classes/Block";

export default class SearchResultRow extends Block<Record<string, unknown>> {
    constructor(props: typeof Block.prototype.props) {
        const tagName = 'li';
        const className = 'search-result__row';

        super('{{ userName }}',{tagName, className, ...props});
    }
}

