import './dropdown.scss';
import DropdownTemplate from './dropdown.hbs?raw';
import Block from '../../classes/Block';

export default class Dropdown extends Block {
    constructor(props: Record<string, string | string[] | Block | Record<string, ((event: Event) => unknown) | boolean> | { name: string, value: string }[]>) {
      const template = DropdownTemplate as string;
      const className = {
        classList: ['dropdown','display-none']
      }
      const tagName = {
        tagName: 'div'
      }
      super(template, { ...tagName, ...className, ...props });
    }
  }