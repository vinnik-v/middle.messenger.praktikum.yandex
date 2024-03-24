import './profile-form-field.scss';
import ProfileFormFieldTemplate from './profile-form-field.hbs?raw';
import Block from '../../../../../../../../classes/Block';

export default class ProfileFormField extends Block {
    constructor(props: Record<string, string | string[] | Record<string, ((event: Event) => unknown) | boolean> | { name: string, value: string }[]>) {
        const template = ProfileFormFieldTemplate as string;
        const classList = {
          classList: ['profile-form__field']
        }
        const tagName = {
          tagName: 'li'
        }
    
        super(template, { ...tagName, ...classList, ...props });
    
      }
}
