import './profile-form.scss';
import ProfileFormTempalte from './profile-form.hbs?raw';
import Block from '../../../../../../classes/Block';
import ProfileFormField from './components/profile-form-field';
import { fieldsData } from './fieldsData';

export default class ProfileForm extends Block {
  constructor(props: Record<string, string | string[] | Record<string, ((event: Event) => unknown) | boolean> | { name: string, value: string }[]>) {
    const template = ProfileFormTempalte as string;
    const classList = {
      classList: ['profile-form']
    }
    const tagName = {
      tagName: 'form'
    }

    const fields = fieldsData.map((item, index) => {
      const fieldName: string = 'profile-form-field_' + (index + 1);
      const value = new ProfileFormField({
        ...item,
        settings: { withInternalID: true },
      }) as Block;
      return { [fieldName]: value };
    }) as Record<string, Block>[];

    super(template, { ...tagName, ...{ fields: fields } as Record<string, Record<string, Block>[]>, ...classList, ...props });

  }
}
