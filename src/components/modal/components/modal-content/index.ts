import Block from '../../../../classes/Block';

export default class ModalContent extends Block {
    constructor(template: string, props: Record<string, string | string[] | Block | Record<string, ((event: Event) => unknown) | boolean> | { name: string, value: string }[]>) {
      const className = {
        className: 'modal__content'
      }
      const tagName = {
        tagName: 'div'
      }
      super(template, { ...tagName, ...className, ...props });
  
    }
  }
