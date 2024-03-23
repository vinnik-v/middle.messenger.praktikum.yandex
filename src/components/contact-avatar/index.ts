import './contact-avatar.scss';
import ContactAvatarTemplate from './contact-avatar.hbs?raw';
import Block from '../../classes/Block';
import avatarIcon from './assets/icons/avatar-icon.svg?raw';
export default class ContactAvatar extends Block {
  constructor(props: Record<string, string | string[] | Record<string, ((event: Event) => unknown) | boolean> | { name: string, value: string }[]>) {
    const template = ContactAvatarTemplate as string;
    const className = {
      className: 'message-box'
    }
    const tagName = {
      tagName: 'div'
    }

    const icons = {
        avatarIcon
      }

    super(template, { ...tagName, ...icons, ...className, ...props });

  }
}
