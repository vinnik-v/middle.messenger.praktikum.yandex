import './profile.scss';
import ProfileTemplate from './profile.hbs?raw';
import Block from '../../../../classes/Block';
import ProfileForm from './components/profile-form';

import profileNoPhotoIcon from './assets/icons/no-photo-icon.svg?raw';
export default class Profile extends Block {
  constructor(props: Record<string, string | string[] | Record<string, ((event: Event)=>unknown) | boolean> | { name: string, value: string}[]>) {
      const template = ProfileTemplate as string;
      const classList = {
          classList: ['profile']
      }
      const tagName = {
          tagName: 'div'
      }

      const icons = {
        profileNoPhotoIcon
      }
      const children = {
          profileForm: new ProfileForm({ settings: { withInternalID: true } })
      } as Record<string, Block>

      super(template, {...tagName, ...children, ...icons, ...classList, ...props});
      
  }
}
