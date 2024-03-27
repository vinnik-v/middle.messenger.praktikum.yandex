import './chat-list-header.scss';
import ChatListHeaderTemplate from './chat-list-header.hbs?raw';
import Block from '../../../../../../classes/Block';
import Button from '../../../../../../components/button';

import headerButtonIcon from './assets/icons/header-menu-button.svg?raw';
import searchIcon from './assets/icons/search-icon.svg?raw';

export default class ChatListHeader extends Block {
    constructor(props: typeof Block.prototype.props) {
        const template = ChatListHeaderTemplate as string;
        const classList = {
            classList: ['chat-list__header']
        }
        const tagName = {
            tagName: 'div'
        }

        const children = {
            button: new Button( headerButtonIcon,{
                className: 'chat-list__header-button',
                redirectPage: 'profile'
            })
        } as Record<string, Block>

        const icons = {
            headerButtonIcon,
            searchIcon
        }

        super(template, {...tagName, ...children, ...icons, ...classList, ...props});
        
    }
}
