
import Block from '../../../../classes/Block';

export default class DropDownContent extends Block<Record<string, unknown>> {
    constructor(template: string, props: typeof Block.prototype.props) {
      const className = {
        className: 'dropdown-content'
      }
      const tagName = {
        tagName: 'div'
      }
      super(template, { ...tagName, ...className, ...props });
  
    }
  }

