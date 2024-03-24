import './profile-page.scss';
import ProfilePageTemplate from './profile-page.hbs?raw';
import { ProfileModalContentTemplate } from './components/profile-modal-content/index'
import Block from '../../classes/Block';
import Profile from './components/profile';
import Modal from '../../components/modal';
import ModalContent from '../../components/modal/components/modal-content';
import FormButton from '../../components/form-button';

import buttonBack from './assets/icons/button-back.svg?raw';

export default class ProfilePage extends Block {
  constructor(props: Record<string, string | string[] | Record<string, ((event: Event)=>unknown) | boolean> | { name: string, value: string}[]>) {
      const template = ProfilePageTemplate as string;
      const classList = {
          classList: ['main-container', 'profile-page']
      }
      const tagName = {
          tagName: 'main'
      }

      const icons = {
        buttonBack
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
              redirectPage: 'profile',
              elemProps: [{ name: 'id', value: 'file-accept-button'}, { name: 'page', value: 'profile' }],
              settings: { withInternalID: true }
            }) 
          }) as Block
        }),
      } as Record<string, Block>

      super(template, {...tagName, ...children, ...icons, ...classList, ...props});
      
  }
}
