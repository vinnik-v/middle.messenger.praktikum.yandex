import './profile-page.scss';
import ProfilePageTemplate from './profile-page.hbs?raw';
import { ProfileModalContentTemplate } from './components/profile-modal-content/index'
import Block from '../../classes/Block';
import Profile from './components/profile';
import Modal from '../../components/modal';
import ModalContent from '../../components/modal/components/modal-content';
import FormButton from '../../components/form-button';

import buttonBackIcon from './assets/icons/button-back.svg?raw';
import Button from '../../components/button';

export default class ProfilePage extends Block {
  constructor(props: Record<string, string | string[] | Record<string, ((event: Event)=>unknown) | boolean> | { name: string, value: string}[]>) {
      const template = ProfilePageTemplate as string;
      const classList = {
          classList: ['main-container', 'profile-page']
      }
      const tagName = {
          tagName: 'main'
      }

      const children = {
        profile: new Profile({ settings: { withInternalID: true } }),
        profileModal: new Modal({
          settings: { withInternalID: true },
          elemProps: [{ name: 'id', value: 'change-profile-photo-modal' }],
          modalContent: new ModalContent(ProfileModalContentTemplate, {
            classList: ['change-profile-photo-modal'],
            modalTitle: 'Загрузите файл',
            settings: { withInternalID: true },
            button: new FormButton({
              classList: ['form-button_main'],
              buttonText: 'Поменять',
              redirectPage: '/settings',
              elemProps: [{ name: 'id', value: 'file-accept-button'}],
              settings: { withInternalID: true }
            }),
          }) as Block
        }),
        buttonToMain: new Button('{{{buttonBackIcon}}}', {
          className: 'profile-page__button-back',
          redirectPage: '/messenger',
          buttonBackIcon: buttonBackIcon
        })
      } as Record<string, Block>

      super(template, {...tagName, ...children, ...classList, ...props});
      
  }
}
