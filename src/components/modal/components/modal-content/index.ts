import Block from '../../../../classes/Block';

export default class ModalContent extends Block<Record<string, unknown>> {
    constructor(template: string, props: typeof Block.prototype.props) {
      const className = {
        className: 'modal__content'
      }
      const tagName = {
        tagName: 'div'
      }
      super(template, { ...tagName, ...className, ...props });
  
    }
  }
