import './chat-window-header.scss';
import ChatWindowHeaderTemplate from './chat-window-header.hbs?raw';
import Block from '../../../../../../classes/Block';
import ContactAvatar from '../../../../../../components/contact-avatar';
import Dropdown from '../../../../../../components/dropdown';
import DropDownContent from '../../../../../../components/dropdown/dropdown-content';

import DropDownContentTemplate from './components/dropdown-content/dropdown-content.hbs?raw';

import headerButton from './assets/icons/header-button-icon.svg?raw';
import addButtonIcon from './components/dropdown-content/assets/icons/add-button.svg?raw';
import deleteButtonIcon from './components/dropdown-content/assets/icons/delete-button.svg?raw';

export default class ChatWindowHeader extends Block {
  constructor(props: Record<string, string | string[] | Record<string, ((event: Event) => unknown) | boolean> | { name: string, value: string }[]>) {
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
    const children = {
      contactAvatar: new ContactAvatar({ settings: { withInternalID: true } }),
      dropdown: new Dropdown({
        settings: { withInternalID: true },
        elemProps: [{ name: 'style', value: 'top: 120%; right: 10px;' }, { name: 'id', value: 'chat-window-header-dropdown' }], 
        dropdownContent: new DropDownContent(DropDownContentTemplate, {
            settings: { withInternalID: true },
            addButtonIcon,
            deleteButtonIcon
        }) as Block
      })
    } as Record<string, Block>

    super(template, { ...tagName, ...children, ...icons, ...className, ...props });

  }
}

