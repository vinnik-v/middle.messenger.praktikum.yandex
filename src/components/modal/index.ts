import './modal.scss';
import ModalTemplate from './modal.hbs?raw';
import Block from '../../classes/Block';

export default class Modal extends Block {
    constructor(props: Record<string, string | string[] | Block | Record<string, ((event: Event) => unknown) | boolean> | { name: string, value: string }[]>) {
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
