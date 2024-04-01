
import Block from '../../../../classes/Block';

export default class DropDownContent extends Block {
    constructor(template: string, props: Record<string, string | string[] | Record<string, ((event: Event) => unknown) | boolean> | { name: string, value: string }[]>) {
      const className = {
        className: 'dropdown-content'
      }
      const tagName = {
        tagName: 'div'
      }
      super(template, { ...tagName, ...className, ...props });
  
    }
  }

