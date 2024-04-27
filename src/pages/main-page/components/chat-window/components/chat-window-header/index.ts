import './chat-window-header.scss';
import ChatWindowHeaderTemplate from './chat-window-header.hbs?raw';
import Block from '../../../../../../classes/Block';
import ChatAvatar from '../../../../../../components/contact-avatar';
import Dropdown from '../../../../../../components/dropdown';
import DropDownContent from '../../../../../../components/dropdown/components/dropdown-content';
import DropDownContentTemplate from './components/dropdown-content/dropdown-content.hbs?raw';
import headerButton from './assets/icons/header-button-icon.svg?raw';
import addButtonIcon from './components/dropdown-content/assets/icons/add-button.svg?raw';
import deleteButtonIcon from './components/dropdown-content/assets/icons/delete-button.svg?raw';
import store, { StoreEvents } from '../../../../../../classes/Store';
import Button from '../../../../../../components/button';
import * as types from '../../../../../../types/types';

export default class ChatWindowHeader extends Block<Record<string, unknown>> {
  constructor(props: typeof Block.prototype.props) {
    const template = ChatWindowHeaderTemplate as string;
    const className = {
      className: 'chat-window__header'
    }
    const tagName = {
      tagName: 'header'
    }
    const icons = {
      headerButton
    }

    const deleteChatButton = new Button('', {
      buttonText: 'Удалить чат',
      classList: ['button', 'delete-chat-button', 'list-item__button'],
      elemProps: [{ name: 'id', value: 'delete-chat-button' }],
      settings: { withInternalID: true },
    })

    const avatar = props.avatar as string;

    const children = {
      chatAvatar: new ChatAvatar({
        settings: { withInternalID: true },
        avatar,
        classList: ['chat-window-avatar'],
        elemProps: [{ name: 'id', value: 'chat-photo' }],
      }),
      dropdown: new Dropdown({
        settings: { withInternalID: true },
        elemProps: [{ name: 'style', value: 'top: 120%; right: 10px;' }, { name: 'id', value: 'chat-window-header-dropdown' }],
        dropdownContent: new DropDownContent(DropDownContentTemplate, {
          settings: { withInternalID: true },
          addButtonIcon,
          deleteButtonIcon,
          deleteChatButton: [{ deleteChatButton }]
        })
      }),

    }

    const membersCount = 1;
    const membersCountText = membersCount === 1 ? 'member' : 'members';

    super(template, { ...tagName, membersCount, membersCountText, ...children, ...icons, ...className, ...props });

    store.on(StoreEvents.ChatUpdated, () => {
      initData();
    })

    const initData = () => {
      const chats = store.getState('chats') as types.IChatItem[];
      if (chats && this.props.chatId) {
        const currentChat = chats.filter(item => item.id === this.props.chatId)[0];
        
        const membersCount = currentChat.users ? currentChat.users.length : 1;
        const membersCountText = membersCount === 1 ? 'member' : 'members';

        const avatar = currentChat.avatar;
        const avatarElem = this.children.chatAvatar as Record<string, (<T extends Record<string, unknown>>(arg: T)=> unknown)>
        avatarElem.setProps({
          avatar
        })
        this.setProps({
          membersCount, membersCountText, avatar
        })
      }
    }

    initData();

  }
}

