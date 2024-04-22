import './dropdown.scss';
import DropdownTemplate from './dropdown.hbs?raw';
import Block from '../../classes/Block';

export default class Dropdown extends Block<Record<string, unknown>> {
  constructor(props: typeof Block.prototype.props) {
    const template = DropdownTemplate as string;
    const className = {
      classList: ['dropdown', 'display-none']
    }
    const tagName = {
      tagName: 'div'
    }
    super(template, { ...tagName, ...className, ...props });
  }
}
