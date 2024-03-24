import './chat-list-header.scss';
import ChatListHeaderTemplate from './chat-list-header.hbs?raw';
import Block from '../../../../../../classes/Block';

import headerButtonIcon from './assets/icons/header-menu-button.svg?raw';
import searchIcon from './assets/icons/search-icon.svg?raw';

export default class ChatListHeader extends Block {
    constructor(props: Record<string, string | string[] | Record<string, ((event: Event)=>unknown) | boolean> | { name: string, value: string}[]>) {
        const template = ChatListHeaderTemplate as string;
        const classList = {
            classList: ['chat-list__header']
        }
        const tagName = {
            tagName: 'div'
        }

        const icons = {
            headerButtonIcon,
            searchIcon
        }

        super(template, {...tagName, ...icons, ...classList, ...props});
        
    }
}
