import './profile.scss';
import ProfileTemplate from './profile.hbs?raw';
import Block from '../../../../classes/Block';
import ProfileForm from './components/profile-form';
import ProfileHeader from './components/profile-header';


export default class Profile extends Block<Record<string, unknown>> {
  constructor(props: typeof Block.prototype.props) {
      const template = ProfileTemplate as string;
      const classList = {
          classList: ['profile']
      }
      const tagName = {
          tagName: 'div'
      }

      const children = {
          form: new ProfileForm({
              classList: ['profile-form'],
              settings: { withInternalID: true },
            }),
          header: new ProfileHeader({
            settings: { withInternalID: true },
          })
      }

      super(template, {...tagName, ...children, ...classList, ...props});
      
  }
}
