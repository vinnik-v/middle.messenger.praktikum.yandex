import './date-row.scss';
import DateRowTemplate from './date-row.hbs?raw';
import Block from '../../../../../../../../classes/Block';

export default class DateRow extends Block {
    constructor(props: typeof Block.prototype.props) {
        const classList = ['date-container'];
        super(DateRowTemplate, {classList, ...props})
    }
}
