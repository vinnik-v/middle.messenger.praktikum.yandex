import './contact-avatar.scss';
import ContactAvatarTemplate from './contact-avatar.hbs?raw';
import Block from '../../classes/Block';
import avatarIcon from './assets/icons/avatar-icon.svg?raw';
export default class ContactAvatar extends Block<Record<string, unknown>> {
  constructor(props: typeof Block.prototype.props) {
    const template = ContactAvatarTemplate as string;
    const className = {
      className: 'contact__avatar'
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
