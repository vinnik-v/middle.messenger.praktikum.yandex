import './modal.scss';
import ModalTemplate from './modal.hbs?raw';
import Block from '../../classes/Block';

export default class Modal extends Block<Record<string, unknown>> {
    constructor(props: typeof Block.prototype.props) {
        const template = ModalTemplate as string;
        const classList = {
            classList: ['modal', 'display-none']
        }
        const tagName = {
            tagName: 'div'
        }

        super(template, { ...tagName, ...classList, ...props });

    }
}
