import './profile.scss';
import ProfileTemplate from './profile.hbs?raw';
import Block from '../../../../classes/Block';
import ProfileForm from './components/profile-form';

import profileNoPhotoIcon from './assets/icons/no-photo-icon.svg?raw';
export default class Profile extends Block {
  constructor(props: typeof Block.prototype.props) {
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
          form: new ProfileForm({
              classList: ['profile-form'],
              settings: { withInternalID: true },
            }) as Block
      } as Record<string, Block>

      super(template, {...tagName, ...children, ...icons, ...classList, ...props});
      
  }
}
